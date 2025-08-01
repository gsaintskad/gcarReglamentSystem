import fs from "fs";
import * as ssh2 from "ssh2";
import * as net from "net";

const { Client } = ssh2;

interface SshConfig {
  host: string;
  port: number;
  username: string;
  privateKey: Buffer;
  passphrase?: string;
}

export const openMyTaxiSShTunnel = new Promise<string>((resolve, reject) => {
  console.log("Opening SSH tunnel...");
  const c = new Client();

  let ready: boolean = false;

  const proxy = net.createServer((sock: net.Socket) => {
    if (!ready) {
      return sock.destroy();
    }

    const pgHost = process.env.MY_TAXI_PG_HOST;
    const pgPort = process.env.MY_TAXI_PG_PORT
      ? parseInt(process.env.MY_TAXI_PG_PORT, 10)
      : undefined;

    if (!pgHost || pgPort === undefined) {
      console.error("Missing PG_HOST or PG_PORT environment variables.");
      return sock.destroy();
    }

    c.forwardOut(
      sock.remoteAddress || "127.0.0.1", // Provide a fallback for remoteAddress
      sock.remotePort || 0, // Provide a fallback for remotePort
      pgHost,
      pgPort,
      (err: Error | undefined, stream: ssh2.Channel) => {
        if (err) {
          console.error("SSH forwarding error:", err);
          return sock.destroy();
        }
        sock.pipe(stream);
        stream.pipe(sock);
      },
    );
  });

  const proxyPort = process.env.MY_TAXI_PROXY_PORT
    ? parseInt(process.env.MY_TAXI_PROXY_PORT, 10)
    : undefined;
  const proxyHost = process.env.MY_TAXI_PROXY_HOST;

  if (!proxyPort || !proxyHost) {
    console.error("Missing PROXY_PORT or PROXY_HOST environment variables.");
    return reject(
      new Error("Missing PROXY_PORT or PROXY_HOST environment variables."),
    );
  }

  proxy.listen(proxyPort, proxyHost, () => {
    console.log(`Proxy listening on ${proxyHost}:${proxyPort}`);
  });

  const privateKeyPath = process.env.MY_TAXI_SSH_PRIVATE_KEY_PATH;
  if (!privateKeyPath) {
    console.error("Missing SSH_PRIVATE_KEY_PATH environment variable.");
    return reject(
      new Error("Missing SSH_PRIVATE_KEY_PATH environment variable."),
    );
  }

  const privateKey: Buffer = fs.readFileSync(privateKeyPath);

  const sshHost = process.env.MY_TAXI_SSH_HOST;
  const sshUser = process.env.MY_TAXI_SSH_USER;

  if (!sshHost || !sshUser) {
    console.error("Missing SSH_HOST or SSH_USER environment variables.");
    return reject(
      new Error("Missing SSH_HOST or SSH_USER environment variables."),
    );
  }

  const sshConfig: SshConfig = {
    host: sshHost,
    port: 22,
    username: sshUser,
    privateKey,
  };

  if (process.env.MY_TAXI_SSH_PASSPHRASE) {
    sshConfig.passphrase = process.env.MY_TAXI_SSH_PASSPHRASE;
  }

  c.connect(sshConfig);

  c.on("ready", () => {
    ready = true;
    resolve("ready");
    console.log("SSH connection ready");
  });

  c.on("error", (err: Error) => {
    console.error("SSH Client Error:", err);
    reject(err);
  });

  proxy.on("error", (err: Error) => {
    console.error("Proxy Server Error:", err);
    reject(err);
  });
});
