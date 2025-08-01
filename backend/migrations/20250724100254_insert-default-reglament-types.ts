// migrations/{timestamp}_seed_reglament_types.ts (replace {timestamp} with an actual timestamp)

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Array of service types with descriptions to insert
  const reglamentTypes = [
    {
      name: "Oil Change Service",
      description:
        "Regular replacement of engine oil and oil filter for optimal engine performance.",
    },
    {
      name: "AC-Filter Change",
      description:
        "Replacement of the cabin air filter to ensure clean air circulation and prevent allergens.",
    },
    {
      name: "Gear Oil",
      description:
        "Replacement of transmission fluid (manual or automatic) to maintain smooth gear shifts and protect components.",
    },
    {
      name: "Brake Oil",
      description:
        "Replacement of hydraulic brake fluid to ensure efficient braking and prevent system corrosion.",
    },
    {
      name: "Brake Pads",
      description:
        "Replacement of worn brake pads to maintain effective braking power and safety.",
    },
    {
      name: "Tyre Change",
      description:
        "Replacement of vehicle tires, including seasonal changes or due to wear and tear.",
    },
    {
      name: "Battery",
      description:
        "Replacement of the vehicle's 12V battery to ensure reliable starting and electrical system function.",
    },
    {
      name: "ТО Масло",
      description:
        "General engine oil and filter service, often part of routine maintenance.",
    },
    {
      name: "ТО Газ",
      description:
        "Maintenance service specifically for the vehicle's LPG/CNG (gas) fuel system.",
    },
    {
      name: "ТО Масло+Газ",
      description:
        "Combined maintenance service for both engine oil and the LPG/CNG fuel system.",
    },
    {
      name: "ГРМ",
      description:
        "Inspection and/or replacement of the timing belt or timing chain, crucial for engine synchronization.",
    },
    {
      name: "Замена свечей",
      description:
        "Replacement of spark plugs to ensure efficient combustion and engine performance.",
    },
    {
      name: "Замена ремня кондиционера",
      description:
        "Replacement of the serpentine belt that drives the air conditioning compressor.",
    },
    {
      name: "Масло в АКПП",
      description:
        "Replacement of automatic transmission fluid to ensure smooth shifts and extend transmission life.",
    },
    {
      name: "Масло в МКПП",
      description:
        "Replacement of manual transmission fluid to ensure smooth shifts and extend transmission life.",
    },
  ];

  // Insert the data into the 'reglament_types' table
  // The 'id' column will be automatically generated by the database
  return knex("reglament_types").insert(reglamentTypes);
}

export async function down(knex: Knex): Promise<void> {
  // Get the names of the types we inserted
  const typeNames = [
    "Oil Change Service",
    "AC-Filter Change",
    "Gear Oil",
    "Brake Oil",
    "Brake Pads",
    "Tyre Change",
    "Battery",
    "ТО Масло",
    "ТО Газ",
    "ТО Масло+Газ",
    "ГРМ",
    "Замена свечей",
    "Замена ремня кондиционера",
    "Масло в АКПП",
    "Масло в МКПП",
  ];

  // Delete the inserted data from the 'reglament_types' table
  return knex("reglament_types").whereIn("name", typeNames).del();
}
