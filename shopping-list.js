var state ={
    list:[{
        id :0,
        name: 'apples',
        isChecked: false

    },
    {
        id :1,
        name: 'bananas',
        isChecked: false

    },
    {
        id :2,
        name: 'oranges',
        isChecked: false

    },
    {
        id :3,
        name: 'pears',
        isChecked: true

    }]

};

function addItem(){
  var name=$('#shopping-list-entry').val();
  var item={
      id : getId(),
      name: name,
      isChecked: false
  };
    state.list.push(item);
}

function getId(){
    for (i = 0; i < state.list.length; i++){
      if (state.list[i].id !== i){
          return i;
      }
    }
    return state.list.length;
}
function clickAdd(e){
    e.preventDefault();
    addItem();
    renderList();
}

function clickCheck(e){
   var name=$(e.currentTarget).parent().parent().find('.shopping-item').text();
   var item=getItemByName(name);
   item.isChecked = !item.isChecked;
   updateState(item,false);
   renderList();
}

function clickDelete(e){
    var name=$(e.currentTarget).parent().parent().find('.shopping-item').text();
    var item=getItemByName(name);
    updateState(item,true);
    renderList();
}

function updateState(item,shouldDelete){
    for (i = 0; i < state.list.length; i++){
        if (state.list[i].id == item.id && !shouldDelete){
            state.list[i] = item;
            break;
        }
        else if(state.list[i].id == item.id){
            state.list.splice(i,1);
            break;
        }
    }
}

function getItemByName(name){
    for (i = 0; i < state.list.length; i++){
        if (state.list[i].name == name){
            return state.list[i];
        }
    }
}

renderList();
$('#shopping-list-form').submit(clickAdd);


function renderList(){
    $('.shopping-list').empty();
    for (i = 0; i < state.list.length; i++){
        $('.shopping-list').append('<li>'+
           '<span class=\"shopping-item '+ (state.list[i].isChecked ? "shopping-item__checked":"") +'\">'+ state.list[i].name + '</span>'+
            '<div class=\"shopping-item-controls\">'+
                '<button class=\"shopping-item-toggle\">'+
                    '<span class=\"button-label\">check</span>'+
                '</button>'+
                '<button class=\"shopping-item-delete\">'+
                    '<span class=\"button-label\">delete</span>'+
                '</button>'+
            '</div>'+
        '</li>');
    }
    $('.shopping-item-toggle').click(clickCheck);
    $('.shopping-item-delete').click(clickDelete);
}



//The splice() method changes the contents of an array by removing existing elements and/or adding new elements.
//it's pointless to have a span inside of a button, because the boss said so
//when you wrap a DOM element into a JQuery selector it turns it into a jquery object
//'.empty' Goes to state and renders what is in the state to the page. '.empty' empties what was there before rendering so the list does not get polluted.
//'break' tells it to exit the loop that it's most immediately in, if you have 2 loops inside of each other(nested), the inner loop will break, the outer will remain functional