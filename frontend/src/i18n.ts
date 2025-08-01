export type maintainedLanguages = "en" | "ua";

export const en = {
  shared: {
    searchBy: "Serach by",
    reglamentType: "Reglament Type",
    remainingMileage: "Remaining mileage",
    reminderDate: "Reminder date",
    notifyAfter: "Notify after",
    notifyBeforeCompletion: "Notify before completion",
    comment: "Comment",
    progress: "Progress",
    licensePlate: "License plate",
    reglament: "Reglament",
  },
  newReglament: {
    createReglament: "Create Reglament",
    title: "Reglament creation",
    description: "Here you can create a new reglament",
  },
  editReglament: {
    description: "Here you can see and edit a reglament",
  },

  buttons: {
    save: "Save",
    delete: "Delete",
    reload: "Reload",
    create: "Create",
    edit: "Edit",
    saveChanges: "Save Changes",
    newReglament: "New Reglament",
  },
  placeHolders: {
    reglamentTypeSelect: "Type",
    search: "Search...",
    commentInput: "Reglament details...",
  },
};
export type i18nLanguageType = typeof en;
export const ua: i18nLanguageType = {
  shared: {
    searchBy: "Шукати за",
    reglamentType: "Тип регламенту",
    remainingMileage: "Залишковий пробіг",
    reminderDate: "Дата нагадування",
    notifyAfter: "Сповіщати після",
    notifyBeforeCompletion: "Сповіщати до завершення",
    comment: "Коментар",
    progress: "Прогрес",
    licensePlate: "Номерний знак",
    reglament: "Регламент",
  },
  newReglament: {
    createReglament: "Створити регламент",
    title: "Створення регламенту",
    description: "Тут ви можете створити новий регламент",
  },
  editReglament: {
    description: "Тут ви можете переглянути та редагувати регламент",
  },

  buttons: {
    save: "Зберегти",
    delete: "Видалити",
    reload: "Оновити",
    create: "Створити",
    edit: "Редагувати",
    saveChanges: "Зберегти зміни",
    newReglament: "Новий регламент",
  },
  placeHolders: {
    reglamentTypeSelect: "Тип",
    search: "Пошук...",
    commentInput: "Деталі регламенту...",
  },
};
