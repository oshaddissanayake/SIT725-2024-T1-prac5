// const cardList = [
//     {
//         title: "Spider man",
//         image: "Image/Image02.jpg",
//         link: "About Spider man",
//         desciption: "Demo desciption about Spider man"
//     },
//     {
//         title: "Caption Amarica",
//         image: "Image/Image03.jpg",
//         link: "About Caption Amarica",
//         desciption: "Demo desciption about Caption Amarica"
//     }
// ]
function postMarval(marval){
    $.ajax({
        url:'/api/marval',
        type:'POST',
        data:marval,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('post successful');
            }
        }
    });
}

function getAllMarval(){
    $.get('/api/marval', (response)=>{
        
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

function clickMe() {
    alert("Thanks for clicking me. Hope you have a nice day!");
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.desciption+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}



$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
    })
    addCards(cardList);
    $('.modal').modal();
  });