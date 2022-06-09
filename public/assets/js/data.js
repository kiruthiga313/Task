function setData(response) {


    var data = JSON.parse(response);

    //console.log(data);

    // $("#password").rules('remove', 'required');
    // $("#password_confirmation").rules('remove', 'required');

    if(data.is_featured == 1){
        $(".featured_image").show();
    }
    if(data.expiration && data.expiration_date){ 
        if(data.expiration_date){
            data.expiration = data.expiration_date;
        }
    }
  

    if(data.picture){ 
        $('.image-placeholder img').attr('src', data.picture);
    }

    if(data.vehicle_image){
        $('.image-placeholder img').attr('src', data.vehicle_image);
    }

    if(data.vehicle_marker){
        $('.image-placeholder img').attr('src', data.vehicle_marker);
    }

    if(data.icon){
        $('.image-placeholder img').attr('src', data.icon);
    }

    if(data.featured_image){
        $('.image-placeholder img').attr('src', data.featured_image);
    }

    if(data.image){
        $('.image-placeholder img').attr('src', data.image);
    }
             
    for (var i in Object.keys(data)) {
       
        if (($("[name=" + Object.keys(data)[i] + "]").length)) {
           
            var node = $("[name=" + Object.keys(data)[i] + "]").prop(
                "nodeName"
            );
            var type = $("[name=" + Object.keys(data)[i] + "]").attr(
                "type"
            );
            
            if (
                (node == "INPUT" && type == "text") ||
                (node == "INPUT" && type == "email") ||
                (node == "INPUT" && type == "number") ||
                (node == "INPUT" && type == "hidden") ||
                (node == "INPUT" && type == "color") ||
                (node == "TEXTAREA")
            ) {

                $("[name=" + Object.keys(data)[i] + "]").val(
                    Object.values(data)[i]
                );
            } else if (node == "INPUT" && type == "radio") {
              
                $(
                    "[name=" +
                        Object.keys(data)[i] +
                        "][value=" +
                        Object.values(data)[i] +
                        "]"
                ).prop("checked", true);
            } else if (node == "INPUT" && type == "file") {
                if (
                    Object.values(data)[i] != "" &&
                    Object.values(data)[i] != null
                ) {
                    $("[name=" + Object.keys(data)[i] + "]")
                        .closest("div")
                        .find("img")
                        .first()
                        .attr("src", Object.values(data)[i])
                        .show();

                    $("[name=" + Object.keys(data)[i] + "]").rules('remove', 'required');

                }
            } else if(node == "INPUT" && type == "checkbox") {
                if(Object.values(data)[i] == 1){
                    $("[name=" + Object.keys(data)[i] + "]" ).attr("checked",true);
                }else{
                    $("[name=" + Object.keys(data)[i] + "]" ).attr("checked",false);
                }
                $("[name=" + Object.keys(data)[i] + "]" ).val(Object.values(data)[i]);
            }
            
            else if (node == "SELECT") {   
                $("select[name=" +
                        Object.keys(data)[i] +
                        "]  option[value='" +
                        Object.values(data)[i] +
                        "']"
                ).attr("selected",true);                   
                $("[name=" +
                        Object.keys(data)[i] +
                        "]  option[value='" +
                        Object.values(data)[i] +
                        "']"
                ).prop("selected", true);
            }

        if(Object.keys(data)[i] == 'country'){
             
            $('#'+Object.keys(data)[i]).attr('readonly',true);
            $('#'+Object.keys(data)[i]).css('pointer-events','none');
            $("[name=" +
            Object.keys(data)[i] +
            "]  option[value='" +
            Object.values(data)[i]._id +
            "']"
           ).prop("selected", true);
        }

        if(Object.keys(data)[i]=='city'){


            $("[name=" +
            Object.keys(data)[i] +
            "]  option[value='" +
            Object.values(data)[i]._id +
            "']"
           ).prop("selected", true); 
           // loadstatecity('city',Object.values(data)[i],Object.values(data)[i]._id);
        }else if(Object.keys(data)[i]=='state'){

            $("[name=" +
            Object.keys(data)[i] +
            "]  option[value='" +
            Object.values(data)[i]._id +
            "']"
           ).prop("selected", true);

            //loadstatecity('state',Object.values(data)[i],Object.values(data)[i]._id);
        } 
        

        if(Object.keys(data)[i]=='admin_service'){

            var admin_service = Object.values(data)[i];
        }
        if(Object.keys(data)[i]=='menu_type_id'){
            
           loadServiceList('menu_type_id',data['service_list'],Object.values(data)[i], admin_service);
        }
        if(Object.keys(data)[i]=='zone_id'){
            
            loadzoneList('zone_id',data['zone_data'],Object.values(data)[i]);
         }
        

        if(Object.keys(data)[i]=='service_subcategory_id'){
            
           loadServiceSubcategory('service_subcategory_id',data['service_subcategory_data'],Object.values(data)[i]);
        }

        if(Object.keys(data)[i]=='mobile'){
            var countryData = window.intlTelInputGlobals.getCountryData();
            var result = $.grep(countryData, function(e){ return e.dialCode == data.country_code; });
            $(".phone").intlTelInput("setCountry", result[0].iso2);
        }   
     

        }else if($("#" +Object.keys(data)[i]).length){
            $("#" + Object.keys(data)[i]).val(Object.values(data)[i]);
        }
    }
    //hideInlineLoader();

}

// function loadstatecity(attr,data,selected_val){
//     $("#"+attr).empty();
//     if(attr=="city"){

//         $("#"+attr).append('<option>-- Select City --</option>');
//     } else {

//         $("#"+attr).append('<option>-- Select State --</option>');
//     }
    

//     $.each(data,function(key,item){
        
//         var selected="";
//         if(attr=="city"){
//             if(key=="_id"){
                    
//                 var city_id=item;
//             }
            
//         } 

//          if(attr=="state"){
           
//             var state_id=key._id;
//             var state_name=key.name;
//         } 
      
//         if(attr=="city"){  
//             if(selected_val==city_id){
               
//                 selected="selected";
//             }
            
//             $("#"+attr).append('<option value="'+city_id+'" '+selected+ ' >'+city_name+'</option>');
//         } else {
//             if(selected_val==state_id){
//                 selected="selected";
//             }
           
//             $("#"+attr).append('<option value="'+state_id+'" '+selected+ ' >'+state_name+'</option>');  
//         }   
// });

// }


