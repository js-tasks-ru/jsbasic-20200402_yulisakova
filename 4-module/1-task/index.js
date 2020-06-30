/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {

  let ul = document.createElement('ul'); 
  ul.innerHTML = "<b>Список друзей:</b>";
  document.body.append(ul);

  for (let person of friends) {
    let li = document.createElement("li");
    li.innerHTML = `${person.firstName} ${person.lastName}`;
    ul.append(li);
  }

  return ul;
}