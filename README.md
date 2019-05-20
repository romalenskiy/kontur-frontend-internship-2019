# Todo comments parser

This is my attempt (successful) to solve the [internship](https://kontur.ru/education/programs/intern/frontend) task of company "SKB Kontur".

## Technical task (ENG)

The task is to make a console utility for the front-end developer.

The utility will take all files with the .js extension in the current directory, find all comments with TODO in them. Search for them, filter, sort.

Here is a list of commands that the application should be able to handle:
1. exit: end of the program (already implemented)
2. show: show all todo
3. important: show only todo with an exclamation mark.
The comment may contain an exclamation mark (!), Which means that this is a high priority task.
4. user {username}: show only comments from the specified user.
The username must be case-insensitive. Example command: "user veronika"
5. sort {importance | user | date}: displays sorted todo

## Technical task (RUS)
**С ПОЛНЫМ ТЗ МОЖНО ОЗНАКОМИТЬСЯ В ФАЙЛЕ [technical_task.txt](./technical_task.txt)**

Задача сделать консольную утилиту для фронтендера.

Утилита будет брать все файлы с расширением .js в текущей директории, находить в них все комментарии с TODO. Искать по ним, фильтровать, сортировать.

Вот список команд, которые должно уметь обрабатывать приложение:
1. exit : завершение работы программы (уже реализовано)
2. show : показать все todo
3. important : показывать только todo, в которых есть восклицательный знак.
В комментарии может присутствовать восклицательный знак (!), что означает, что это задача с высоким приоритетом.
4. user {username} : показывать только комментарии от указанного пользователя.
Имя пользователя должно быть регистронезависимо. Пример команды: "user veronika"
5. sort {importance | user | date} : выводит отсортированные todo 

## Local setup

Clone the repo:

```bash
git clone https://github.com/romalenskiy/todo-comments-parser.git
```

Install node packages:

```bash
npm install
```

Start the utility:

```bash
cd src
node index.js
```

Run test suite:
(from any directory)

```bash
npm test
```