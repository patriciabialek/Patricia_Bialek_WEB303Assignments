/*
    Assignment 05
*/

$(document).ready(function () {
    
    class ContentItem{
       
       //this. allows us to access object properties from inside a method
        constructor(id, name, desc, cat){
            //initialize the properties 
            this.id = id;
            this.name = name;
            this.desc = desc;
            this.cat = cat;
        }

        //These parameters represent the new values that you may want to assign to the properties of the ContentItem object.
        updateContentitem(id, name, desc, cat){
            //if the passed id matches the current instance id, if true it updates the properties - if they are not null

            //This checks if the id passed to the method matches the id of the current instance of the ContentItem.
            if(id === this.id) {
                if(name !== null) 
                this.name = name;

                if(desc !== null) 
                this.desc = desc;

                if(cat !== null) 
                this.cat = cat;
                //If any of them are not null, it means that a new value has been provided for that property.
                //If a new value is provided (i.e., it's not null), it updates the corresponding property of the current instance with the new value.
                //This method provides a way to update the properties of a ContentItem object after it has been created. It's useful if, for example, you want to change the name, description, or category of a content item without creating a new instance.
            }
        }

        //outputs html content
        toString(){
            //create div and add attributes
            let div = $('<div></div>');
            div.attr('class', 'content-item-wrapper');
            div.attr('id', `content-item-${this.id}`);

            //html elements inside div
            let h2 = $('<h2></h2>').text(`${this.name}`);
            let p = $('<p></p>').text(`${this.desc}`);
            let lDiv = $('<div></div>').text(`${this.cat}`);

            div.append(h2);
            div.append(p);
            div.append(lDiv);

            //div element appends to list id
            const list = $("#content-item-list");
            list.append(div);
        }
    }

    //array of content items for the class
    const contentItems = [
        new ContentItem(0, 'Yves Saint Laurent', 'Candy Glaze Lip Gloss Stick', 'Lipstick'),

        new ContentItem(1, 'Rare Beauty', 'Soft Pinch Liquid Blush', 'Blush'),

        new ContentItem(2, 'Glow Recipe', 'Guava Vitamin C Bright-Eye Gel Cream', 'Skincare'),

        new ContentItem(3, 'Nars', 'Light Reflecting Advanced Skincare Foundation', 'Foundation'),

        new ContentItem(4, 'Too Faced', 'Lip Injection Hydrating & Plumping Lip Gloss', 'Lip Gloss')
    ];
    //testing
    console.log(contentItems[0]);
    console.log(contentItems[1]);
    console.log(contentItems[2]);
    console.log(contentItems[3]);
    console.log(contentItems[4]);

    //iterate over the array and use the toString method to get its html format, then it is appnded to the list id
    //arrayname.foreach => individual item
    //append the each item.toString to the list id
    const $list = $("#content-item-list");
    contentItems.forEach(item => {
        $list.append(item.toString());
    });

    //apply styling to the new div element
    $(".content-item-wrapper").css({
        border: "2px solid red",
        width: "400px",
        padding: "10px",
        margin: "20px auto",
    });
});