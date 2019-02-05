var add_todo_btn = document.getElementById('add-btn');
var todo_input = document.getElementById('todo-input');
var list = document.getElementById('columns');

add_todo_btn.addEventListener('click',function(){
    var todo = todo_input.value;
    todo_input.value="";
    if(todo.length === 0)
    {
        return false;
    }
    var child_div_list = document.createElement('div');
    var div_item = document.createElement('div');
    var div_btn = document.createElement('div');
    var todo_text_field = document.createElement('span');
    var edit_btn = document.createElement('button');
    var remove_btn = document.createElement('button');

     //for dragging
     child_div_list.classList.add('column');
     child_div_list.draggable=true;

    child_div_list.classList.add('child_div_list_class');
    div_btn.classList.add('div_item_class');
    div_item.classList.add('div_btn_class');
    edit_btn.classList.add('edit_btn_class');
    remove_btn.classList.add('remove_btn_class');

    
    //edit input

    var edit_input = document.createElement('textarea');
    edit_input.classList.add('edit_input_class');
    edit_input.classList.add('hide');
    edit_input.name='edit-input';
    edit_input.type='text';
    edit_input.value=todo;

    //update btn 
    var update_btn = document.createElement('button');
    update_btn.classList.add('update_btn_class');
    update_btn.classList.add('hide');
    update_btn.textContent = 'UPDATE';
    update_btn.type= 'button';


    edit_btn.addEventListener('click',function(){
      
         edit_input.classList.remove('hide');
         todo_text_field.classList.add('hide');
         update_btn.classList.remove('hide');
         edit_btn.classList.add('hide');

         update_btn.addEventListener('click',function()
        {
            if(edit_input.value.length ===0)
            {
            alert('cannot be empty');
                return false;
            }
        
        //console.log(todo_text_field.textContent);
        todo_text_field.textContent=edit_input.value;
        edit_input.classList.add('hide');
        todo_text_field.classList.remove('hide');
        update_btn.classList.add('hide');
        edit_btn.classList.remove('hide');

        });
    });
    


        remove_btn.addEventListener('click',function(){
            child_div_list.parentNode.removeChild(child_div_list);
        });

    
list.appendChild(child_div_list);
child_div_list.appendChild(div_item);
child_div_list.appendChild(div_btn);
div_item.appendChild(todo_text_field);
div_item.appendChild(edit_input);
div_btn.appendChild(update_btn);
div_btn.appendChild(edit_btn);
div_btn.appendChild(remove_btn);
edit_btn.appendChild(document.createTextNode('EDIT'));
remove_btn.appendChild(document.createTextNode('REMOVE'));
todo_text_field.appendChild(document.createTextNode(todo));    
addEventsDragAndDrop(child_div_list);
});


function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };
  
  function dragEnter(e) {
    this.classList.add('over');
  }
  
  function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }
  
  function dragDrop(e) {
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }
  
  function dragEnd(e) {
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      item.classList.remove('over');
    });
    this.style.opacity = '1';
  }
  
  function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
  }
  
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
  });