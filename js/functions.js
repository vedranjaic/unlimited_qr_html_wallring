// JavaScript Document
$(document).ready(function(){
	
	$("#qr_input_text, #qr_input_phone, #qr_input_sms_nr, #qr_input_sms_msg, #counter, #counter_sms").hide();
	
	curr_input 	= "url";
	curr_msg	= "";
	
	
	$("input[name='qr_content']").change(function(){
		if($("input[name='qr_content']:checked").val() == 'qr_content_url')
		{
			$("#qr_input_text").val("");
			$("#qr_input_phone").val("+385 ");
			$("#qr_input_sms_nr").val("+385 ");
			$("#qr_input_sms_msg").val("Poruka");
			
			$("#qr_input_" + curr_input).fadeOut("fast", function(){
				if(curr_msg != "")
				{
					$("#qr_input_sms_msg").fadeOut("fast");
					curr_msg = "";
				}
				$("#qr_input_url").fadeIn("fast");
				$("#counter").fadeOut("fast");
				$("#counter_sms").fadeOut("fast");
			})		
			curr_input = "url";
		}
		else if($("input[name='qr_content']:checked").val() == 'qr_content_text')
		{
			$("#qr_input_text").val("");
			$("#qr_input_phone").val("+385 ");
			$("#qr_input_sms_nr").val("+385 ");
			$("#qr_input_sms_msg").val("Poruka");
			
			$("#qr_input_" + curr_input).fadeOut("fast", function(){
				if(curr_msg != "")
				{
					$("#qr_input_sms_msg").fadeOut("fast");
					curr_msg = "";
				}
				$("#qr_input_text").fadeIn("fast");
				$("#counter").fadeIn("fast");
				$("#counter_sms").fadeOut("fast");
			})		
			curr_input = "text";
		}
		else if($("input[name='qr_content']:checked").val() == 'qr_content_phone')
		{
			$("#qr_input_" + curr_input).fadeOut("fast", function(){
				
				if(curr_msg != "")
				{
					$("#qr_input_sms_msg").fadeOut("fast");
					curr_msg = "";
				}
				$("#qr_input_phone").fadeIn("fast");
				$("#counter").fadeOut("fast");
				$("#counter_sms").fadeOut("fast");
			})					
			curr_input = "phone";
		}
		
		else if($("input[name='qr_content']:checked").val() == 'qr_content_sms')
		{
			$("#qr_input_text").val("");
			$("#qr_input_phone").val("+385 ");
			$("#qr_input_sms_nr").val("+385 ");
			$("#qr_input_sms_msg").val("Poruka");
			
			$("#qr_input_" + curr_input).fadeOut("fast", function(){
				$("#qr_input_sms_nr").fadeIn("fast");
				$("#qr_input_sms_msg").fadeIn("fast");
			})		
			$("#counter").fadeOut("fast");
			$("#counter_sms").fadeIn("fast");
			curr_input 		= "sms_nr";		
			curr_msg		= "sms_msg";
		}
	});
	
	$("#qr_submit").bind("click", function(){
		
		
		/*$("#qr_form").animate({
			height: '140px'
  			}, 1, function() {
    		// Animation complete.
  		});*/
		
		$("#qrcode").html("");
		
		if(curr_msg != "")
		{
			$("#qrcode").qrcode("SMSTO:" + $("#qr_input_" + curr_input).val() + ":" +$("#qr_input_" + curr_msg).val());
		}
		else if($("#qr_input_phone").val() != "+385 ")
		{
			$("#qrcode").qrcode("TEL:" + $("#qr_input_" + curr_input).val());
		}
		else
		{
			$("#qrcode").qrcode($("#qr_input_" + curr_input).val());
		}
		$("#qr_input_" + curr_input).fadeOut("fast", function(){
				if(curr_msg != "")
				{
					$("#qr_input_sms_msg").fadeOut("fast");
					curr_msg = "";
				}
				$("#qr_content_url").attr('checked', 'checked');
				$("#qr_input_url").fadeIn("fast");
				$("#counter").fadeOut("fast");
				$("#counter_sms").fadeOut("fast");
				
		})		
		curr_input = "url";

		$("#qr_input_text").val("");
		$("#qr_input_phone").val("+385 ");
		$("#qr_input_sms_nr").val("+385 ");
		$("#qr_input_sms_msg").val("Poruka");
		$("#qrcode_holder").fadeIn("slow");
		return false;
	});
	
	poruka = "Poruka";
	$("#qr_input_sms_msg").bind("focus", function(){
		if($("#qr_input_sms_msg").val() == poruka)
		{
			$("#qr_input_sms_msg").val("");
		}
	});
	$("#qr_input_sms_msg").bind("focusout", function(){
		if($("#qr_input_sms_msg").val() == "")
		{
			$("#qr_input_sms_msg").val("Poruka");
		}
	});
	
	$("#qr_back").bind("click", function(){
		$("#qr_form").removeClass("small_form");	
		$("#qrcode_holder").hide();
		return false;
	})
	
	
	$("#qr_input_text").live("keyup", function(){
		
		var limit	= $("#counter_text_limit").val();
		//alert("LIMIT " + limit);
		var counter = limit - $("#qr_input_text").val().length;
		//alert("COUNTER: " + counter);
		
		var out = "";
		
		if(counter < 1)
		{
			out = $("#qr_input_text").val().substr(0,limit);
		}
		else
		{
			out = $("#qr_input_text").val();
		}
		if(counter > 0)
		{
			$("#counter").html(counter);
		}
		else
		{
			$("#counter").html("0");
		}
		$("[name=qr_input_text]").val(out);
	});
	
	$("#qr_input_sms_msg").live("keyup", function(){
		
		var limit	= $("#counter_sms_limit").val();
		//alert("LIMIT " + limit);
		var counter = limit - $("#qr_input_sms_msg").val().length;
		//alert("COUNTER: " + counter);
		
		var out = "";
		
		if(counter < 1)
		{
			out = $("#qr_input_sms_msg").val().substr(0,limit);
		}
		else
		{
			out = $("#qr_input_sms_msg").val();
		}
		if(counter > 0)
		{
			$("#counter_sms").html(counter);
		}
		else
		{
			$("#counter_sms").html("0");
		}
		$("[name=qr_input_sms_msg]").val(out);
	});


/*	$("#x").change(function(){
		if($('#x').is(':checked'))
		{
			window.location.replace("http://google.com");
		}
	});*/
	
	
	// toglanje
	
	var tog_flag 	= 0;
	var tog_cur		= "";
	
	//$("#idemo_van, #poi, #wifi_lokator, #gdje_ima_dima, #puls_generacije").bind("click", function(){
	
	$("#idemo_van, #idemo_van_2").bind("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_idemovan").fadeIn("fast");
				tog_cur = $("#togg_idemovan");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;
		}
		else
		{
			if(tog_cur != "" && tog_cur != "#togg_idemvan")
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_idemovan").fadeIn("fast");
			tog_cur = $("#togg_idemovan");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	$("#poi, #poi_2").bind("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_poi").fadeIn("fast");
				tog_cur	= $("#togg_poi");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if(tog_cur != "" && tog_cur != "#togg_poi")
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_poi").fadeIn("fast");
				tog_cur	= $("#togg_poi");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	
	$("#wifi_lokator, #wifi_2").bind("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_wifi").fadeIn("fast");
				tog_cur	= $("#togg_wifi");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if(tog_cur != "" && tog_cur != "#togg_wifi")
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_wifi").fadeIn("fast");
					tog_cur	= $("#togg_wifi");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	$("#gdje_ima_dima, #dim_2").bind("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_smoke").fadeIn("fast");
				tog_cur	= $("#togg_smoke");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if(tog_cur != "" && tog_cur != "#togg_smoke")
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_smoke").fadeIn("fast");
					tog_cur	= $("#togg_smoke");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	$("#login").bind("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_login").fadeIn("fast");
				tog_cur	= $("#togg_login");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if(tog_cur != "" && tog_cur != "#togg_login")
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_login").fadeIn("fast");
					tog_cur	= $("#togg_login");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	$("#register").bind("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_register").fadeIn("fast");
				tog_cur	= $("#togg_register");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if(tog_cur != "" && tog_cur != "#togg_register")
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_register").fadeIn("fast");
					tog_cur	= $("#togg_register");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	
	$("#open_acc").live("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_register").fadeIn("fast");
				tog_cur	= $("#togg_register");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if((tog_cur != "") && (tog_cur != "#togg_register"))
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_register").fadeIn("fast");
					tog_cur	= $("#togg_register");
					$(tog_cur,  ".jqtransform_fix").jqTransform();
					$(".togg_leftE",  tog_cur).click(function(){
						//$(this).fadeOut("fast");
						//$(".toggle_inner").fadeOut("fast");
						tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	
	
	
	$("#togg_login_btn").live("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_login").fadeIn("fast");
				tog_cur	= $("#togg_login");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if((tog_cur != "") && (tog_cur != "#togg_login"))
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_login").fadeIn("fast");
					tog_cur	= $("#togg_login");
					$(tog_cur,  ".jqtransform_fix").jqTransform();
					$(".togg_leftE",  tog_cur).click(function(){
						//$(this).fadeOut("fast");
						//$(".toggle_inner").fadeOut("fast");
						tog_flag 	= 0;
				});
				});
			}
			
		}
	});

	$("#togg_forgot").live("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_forgottenpass").fadeIn("fast");
				tog_cur	= $("#togg_forgottenpass");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if((tog_cur != "") && (tog_cur != "#togg_forgottenpass"))
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_forgottenpass").fadeIn("fast");
					tog_cur	= $("#togg_forgottenpass");
					$(tog_cur,  ".jqtransform_fix").jqTransform();
					$(".togg_leftE",  tog_cur).click(function(){
						//$(this).fadeOut("fast");
						//$(".toggle_inner").fadeOut("fast");
						tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	
	$("#togg_reg").live("click", function(){
		if(!tog_flag)
		{
			$(".toggle_inner").animate({
				height: 'toggle'
 			}, 10, function() {
				$("#togg_register").fadeIn("fast");
				tog_cur	= $("#togg_register");
				$(tog_cur,  ".jqtransform_fix").jqTransform();
				$(".togg_leftE",  tog_cur).click(function(){
					$(tog_cur).fadeOut("fast");
					$(".toggle_inner").fadeOut("fast");
					tog_flag 	= 0;
				});
			});
			tog_flag = 1;	
		}
		else
		{
			if((tog_cur != "") && (tog_cur != "#togg_register"))
			{
				$(tog_cur).fadeOut("fast", function(){
					$("#togg_register").fadeIn("fast");
					tog_cur	= $("#togg_register");
					$(tog_cur,  ".jqtransform_fix").jqTransform();
					$(".togg_leftE",  tog_cur).click(function(){
						//$(this).fadeOut("fast");
						//$(".toggle_inner").fadeOut("fast");
						tog_flag 	= 0;
				});
				});
			}
			
		}
	});
	
	$("#idemo_van_2, #poi_2, #wifi_2, #dim_2").click(function(){
		$('html, body').animate({
			 scrollTop: '0px'
		 },
		 500);
		 return false;	
	})
});