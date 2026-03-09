### What is the difference between var, let, and const?
    -> var is a global scoped variable and it can be change in or out of the function anytime which is a big problem for developer. So now a days usually developers avoid using var.

    -> let is block-scoped variable that means if you declare a variable using let in a function u can use it only in the function not outside of the function which is very helpful for the developers.

    -> const is also a block-scoped variable but if you declare something with const you can't change the value of that variable. 

### What is the spread operator (...)?
    ->spread operator is usually used to expand an array , object or string into individual elements of properties.
    ex: const teamMember = [rakib, jibon , apu];
    console.log(...teamMember); //rakib, jibon, apu


### What is the difference between map(), filter(), and forEach()?

    ->map(): transform each element of an array and return a new array of the same length with modified data.

    ->filter(): select elements that satisfy a condition and return a new array with only the elements that pass the test.

    ->forEach(): execute a function on each element of the array and it does not return any new array.

### What is an arrow function? 

    -> An arrow function is a shorter way to write a function using the => syntax. If it is online there are no need to use any second bracket and no need to return anything But if it is multiline need to use second bracket and should return something.

### (5) What are template literals?

    ->Template literals is a strings that allow embedded expressions , multi-line text, and string. Usually we use it when we need to use dynamic input which can't be called using regular quotes like "" or ''.