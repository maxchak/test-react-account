// Проверка номера телефона для России
export const checkPhone = (phone: string) => {
  const re = /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;

  return re.test(phone);
};
