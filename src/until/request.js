// const API_DOMAIN = "https://database-quiz.onrender.com";
const API_DOMAIN = "http://localhost:3002";

export const get = async (path) => {
  // Đúng tên biến là response, không phải respone
  const response = await fetch(API_DOMAIN + path);
  // Sử dụng await để đợi response chuyển đổi thành JSON
  const results = await response.json();
  return results;
};

export const post = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
