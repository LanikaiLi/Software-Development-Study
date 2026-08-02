const newFile = (name, contents) => {
	return {
		name: name,
		contents: contents
	}
}

const newFolder = (name, files = []) => {
	return {
		name: name,
		files: files
	}
}

const files = newFolder("computer", [
	newFolder("Desktop", [
		newFile("todo-list.txt", "Things to do this week"),
		newFile("grocery-list.txt", "Eggs, cheese, rice"),
        newFolder("Documents", [
            newFile("resume.txt", "My resume"),
            newFolder("Important Documents", [
                newFile("taxes.txt", "Tax documents"),
                newFile("id.txt", "Government id"),
            ])
        ]),
        newFolder("Projects", [
            newFile("bubble-sort.js", "a bubble sort algorithm"),
            newFile("linked-list.js", "a linked list algorithm"),
            newFile("file-tree.js", "a file tree")
        ]),
        newFile("notes.txt", "Some notes")
	]),
])

// console.log(files);
// console.log(files.files);

class ArrayQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element) {
      this.items.push(element); // Adds to the end
    }
  
    dequeue() {
      if (this.isEmpty()) return "Underflow";
      return this.items.shift(); // Removes from the front (O(n) complexity)
    }
  
    peek() {
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  }
  

// 1. Search: write a function that searches for a specific piece of text in the contents of the file tree. For example, searching for "algorithm" should return an array of the files "linked-list.js" and "bubble-sort.js". Searching for "grocery" should return an array with only the "grocery-list.txt" file. Searching for "elephant" should return an empty array.

// my logic: use BFS to search through the tree. Since it is BFS, it needs to move on only after it has finished searching the current level, so we can first push all folders to a queue in the order of their depth (from lower depth to higher depth). After we have the queue ready, what we need to do is just to simple take items out from the queue  and search through all items. If we find anything in content or name of the item, we add the item to the result array. otherwise, we continue to next item.

// but, how to take all the folders out? 
// no you don't need to take all the folders out from that object, because it is already saved in the object itself. 你不需要先把所有 folders “找出来再塞进 queue”。BFS 是一边遍历一边往 queue 里加孩子

// 你要做的是先把一整个object塞进queue, 然后开始遍历。遍历的时候，如果遇到folder，就把它塞进queue。如果遇到file，就检查它的内容或名字是否符合条件。如果符合，就把它加到结果数组里。如果不符合，就继续遍历下一个item。

const processFolders = (files, queue) => {
    files.forEach(file => {
        queue.enqueue(file);
    });
    return queue;
}

const processFiles = (contents, name, text, result) => {
    if (contents.includes(text) || name.includes(text)) {
        result.push({contents, name});
    }
    return result;
}

const search = (root, text) => {
    let result = [];
    let queue = new ArrayQueue();
    queue.enqueue(root);
    while (!queue.isEmpty()) {
        let current = queue.dequeue();
        if (current.contents) processFiles(current.contents, current.name, text, result); // if it is a file
        if (current.files) processFolders(current.files, queue); // if it is a folder
    }
    return result;
} 

console.log(search(files, "elephant"));
console.log(search(files, "algorithm"));
console.log(search(files, "grocery"));

// 2. Count files: write a function that counts how many files are in the whole file tree.
// same as above, just need to change the behavior of processFiles

const processFoldersCount = (files, queue) => {
    files.forEach(file => {
        queue.enqueue(file);
    });
    return queue;
}

const processFilesCount = (result) => {
    result.push(1);
    //console.log(result);
}

const count = (root) => {
    let result = [];
    let queue = new ArrayQueue();
    queue.enqueue(root);
    while (!queue.isEmpty()) {
        let current = queue.dequeue();
        if (current.contents) processFilesCount(result); // if it is a file
        if (current.files) processFoldersCount(current.files, queue); // if it is a folder
    }
    return result.length;
} 

console.log(count(files))

// 3. List all files: write a function that returns an array of all the files in the tree.

// 4. Add new file to folder: write a function that takes in a file and filepath as a parameter, like this:
// addNewFile(newFile("list.txt", "a list"), "Desktop/Documents/Important Documents")
// The function should create the new file inside the Important Documents folder.