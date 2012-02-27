// JavaScript Document

// ovo kopiraj u functions, skroz na kraj!

function input_val(id)
{
	var input_value = $("#"+id).val();
	
	$("#"+id).focus(function(){
			//alert("#");
		if($("#"+id).val() == input_value)
		{
			$("#"+id).val("");
		}
	})
	$("#"+id).focusout(function(){
			//alert("!");
		if($("#"+id).val() == "")
		{
			$("#"+id).val(input_value);
		}
	})
}