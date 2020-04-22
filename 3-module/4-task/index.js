/**
 * showSalary
 * @param {Array} data - данные о пользователях, массив объектов
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {

  let filteredUsers = data.filter(function(item) {
    return item.age <= age;
  });

  let namesBalances = filteredUsers.map(function(matchingUser) {
    return matchingUser.name + ", " + matchingUser.balance;
  });
  
  return namesBalances.join("\n");
}