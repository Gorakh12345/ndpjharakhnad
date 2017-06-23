jQuery(document).ready(function($){$('.cd-dropdown-trigger').on('click',function(event){event.preventDefault();toggleNav();});$('.cd-dropdown .cd-close').on('click',function(event){event.preventDefault();toggleNav();});$('.has-children').children('a').on('click',function(event){event.preventDefault();var selected=$(this);selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');});var submenuDirection=(!$('.cd-dropdown-wrapper').hasClass('open-to-left'))?'right':'left';$('.cd-dropdown-content').menuAim({activate:function(row){$(row).children().addClass('is-active').removeClass('fade-out');if($('.cd-dropdown-content .fade-in').length==0)$(row).children('ul').addClass('fade-in');},deactivate:function(row){$(row).children().removeClass('is-active');if($('li.has-children:hover').length==0||$('li.has-children:hover').is($(row))){$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');$(row).children('ul').addClass('fade-out')}},exitMenu:function(){$('.cd-dropdown-content').find('.is-active').removeClass('is-active');return true;},submenuDirection:submenuDirection,});$('.go-back').on('click',function(){var selected=$(this),visibleNav=$(this).parent('ul').parent('.has-children').parent('ul');selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');});function toggleNav(){var navIsVisible=(!$('.cd-dropdown').hasClass('dropdown-is-active'))?true:false;$('.cd-dropdown').toggleClass('dropdown-is-active',navIsVisible);$('.cd-dropdown-trigger').toggleClass('dropdown-is-active',navIsVisible);if(!navIsVisible){$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){$('.has-children ul').addClass('is-hidden');$('.move-out').removeClass('move-out');$('.is-active').removeClass('is-active');});}}if(!Modernizr.input.placeholder){$('[placeholder]').focus(function(){var input=$(this);if(input.val()==input.attr('placeholder')){input.val('');}}).blur(function(){var input=$(this);if(input.val()==''||input.val()==input.attr('placeholder')){input.val(input.attr('placeholder'));}}).blur();$('[placeholder]').parents('form').submit(function(){$(this).find('[placeholder]').each(function(){var input=$(this);if(input.val()==input.attr('placeholder')){input.val('');}})});}});

function checkTotal(amt,x){
	var sum=0;
	var checked=$('#choice_'+x).is(':checked');
	if(checked){
		sum=parseInt(amt);
	}else{
		sum=-parseInt(amt);
	}
	var total=parseInt(document.listForm.total.value)+sum;
	document.listForm.total.value=total;
	document.getElementById('totalDiv').innerHTML=total;
}
	
function getXMLHTTP(){
	var xmlhttp=false;
	try{
	 xmlhttp=new XMLHttpRequest();
	 }catch(e){
		 try{
			 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			 }catch(e){
				 try{
					 xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
					 }catch(e1){
						 xmlhttp=false;
						 }
						}
					}
					return xmlhttp;
				}

function getPackage(id){
	var service_id=document.getElementById('service').value;
	var director=document.getElementById('director').value;
	var strURL="getPackage.php?service_id="+service_id+"&director="+director;
	var req=getXMLHTTP();
	if(req){
		req.onreadystatechange=function(){
			if(req.readyState==4){
				if(req.status==200){
					document.getElementById('serviceValue').innerHTML=req.responseText;
				}else{
					alert("There was a problem while using XMLHTTP:\n"+req.statusText);
				}
			}
		}
    req.open("GET",strURL,true);
    req.send(null);
  }
}

function getLogin(){
	var error='';
	var re=/(\w+)\@(\w+)\.[a-zA-Z]/g;
	var testEmail=re.test(document.getElementById('memberemail').value);
	if(!testEmail){
		error+="\nPlease enter a valid email";
		}
	if(document.getElementById('memberpassword').value==""){
		error+="\nEnter Password";
	}
	if(error!=''){
		alert(error)
        return false
	}else{
		$.ajax({
			type:"POST",
			url:"getValidate.php",
			data:"memberemail="+document.getElementById('memberemail').value+"&memberpassword="+document.getElementById('memberpassword').value,
			cache:false,
			success:function(response){
				if(response=='success'){
					$('#msg').html(response);
					$('.buttonNext').click();
					$('.use_ragistration').hide();
					$('.use_ragistration2').hide();
				}else{
					$('#msg').html(response);
				}
			}
		});
	}
}

function getRegistration(){
	$.ajax({
		type:"POST",
		url:"getRegistration.php",
		data:"guestemail="+document.getElementById('guestemail').value+"&guestphone="+document.getElementById('guestphone').value+"&guestcity="+document.getElementById('guestcity').value,
		cache:false,
		success:function(response){
			$('#msg').html(response);
			}
		});
	}

function showForm(type){
	if(type==0){
		$('#confirmpass').show();
		$('#reg_cpassword').prop("disabled",false);		
	}
	if(type==1){
		$('#confirmpass').hide();
		$('#reg_cpassword').prop("disabled",true);
		}
}

function selectCoupon(coupon){
	if(coupon!=''){
		$('#coupan_code').val(coupon);
	}else{
		$('#coupan_code').val('');
		$.ajax({
			type:"POST",
			url:"applyCoupan.php",
			data:"coupan_code="+coupon+"&total_amt="+document.getElementById('total_amt').value,
			cache:false,
			success:function(response){
				var mesg1=response.split(',');
				if(mesg1[0]>0){
					$('#coupan_amt').val(mesg1[0]);
					$('#pay_amt').val(mesg1[1]);
					$('#total').html('<div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+document.getElementById('total_amt').value+'</span></div><div class="total">Coupon Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+mesg1[0]+'</span></div><div class="total">Total Pay Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+mesg1[1]+'</span></div>');}else{$('#total').html('<div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+document.getElementById('total_amt').value+'</span></div>');
					}
				}
			});
		}
	}


/*function applyCoupan(){$.ajax({type:"POST",url:"applyCoupan.php",data:"coupan_code="+document.getElementById('coupan_code').value+"&total_amt="+document.getElementById('total_amt').value,cache:false,success:function(response){var mesg1=response.split(',');if(mesg1[0]>0){$('#coupan_amt').val(mesg1[0]);$('#pay_amt').val(mesg1[1]);$('#total').html('<div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+document.getElementById('total_amt').value+'</span></div><div class="total">Coupon Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+mesg1[0]+'</span></div><div class="total">Total Pay Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+mesg1[1]+'</span></div>');}else{$('#total').html('<div class="total">Coupon Code Invalid</div><div class="total">Total Pay Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+document.getElementById('total_amt').value+'</span></div>');}}});}*/

function applyCoupan(){
	if(document.getElementById('coupan_code').value==''){
		alert('Please Enter Coupon Code');
		document.getElementById('coupan_code').focus();
		
		var service_tax =(document.getElementById('tax_apply_amt').value*document.getElementById('tax').value)/100;
		var payTotal= parseFloat(document.getElementById('after_total_amt').value) + parseFloat(service_tax);
		
		$('#coupan_amt').val(0);
		$('#service_tax').val(service_tax);
		$('#pay_amt').val(payTotal);
		
			
		$('#couponAmt').html('');		
		$('#serviceTax').html('<td colspan="3"><div class="total">Service Tax ( '+ document.getElementById('tax').value +'% ) : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ service_tax +'</span></div></td>');
		
$('#payTotal').html('<td colspan="3"><div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ payTotal +'</span></div></td>');
		
	}else{
	
	$.ajax({
		type: "POST",
		url: "applyCoupan.php",
		data: "coupan_code="+ document.getElementById('coupan_code').value +"&tax="+ document.getElementById('tax').value +"&tax_apply_amt="+ document.getElementById('tax_apply_amt').value +"&after_total_amt="+ document.getElementById('after_total_amt').value, 
		cache: false,
		success: function(response){
	    var mesg1=response.split(',');
		if(mesg1[0]>0){						
		$('#coupan_amt').val(mesg1[0]);
		$('#tax').val(mesg1[1]);
		$('#service_tax').val(mesg1[3]);
		$('#pay_amt').val(mesg1[4]);
		
		$('#couponAmt').html('<td colspan="3"><div class="total">Coupon Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ mesg1[0] +'</span></div></td>');
		
		$('#serviceTax').html('<td colspan="3"><div class="total">Service Tax ( '+ mesg1[1] +'% ) : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ mesg1[3] +'</span></div></td>');
		
$('#payTotal').html('<td colspan="3"><div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ mesg1[4] +'</span></div></td>');
		}else{

        alert('Please Enter Valid Coupon Code');
		document.getElementById('coupan_code').focus();
		
		$('#coupan_amt').val(mesg1[0]);
		$('#tax').val(mesg1[1]);
		$('#service_tax').val(mesg1[3]);
		$('#pay_amt').val(mesg1[4]);
		
		$('#couponAmt').html('');
		
		$('#serviceTax').html('<td colspan="3"><div class="total">Service Tax ( '+ mesg1[1] +'% ) : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ mesg1[3] +'</span></div></td>');
		
$('#payTotal').html('<td colspan="3"><div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ mesg1[4] +'</span></div></td>');		
		
		
		/*var service_tax =(document.getElementById('tax_apply_amt').value*document.getElementById('tax').value)/100;
		var payTotal= parseFloat(document.getElementById('after_total_amt').value) + parseFloat(service_tax);
		
		$('#coupan_amt').val(0);
		$('#service_tax').val(service_tax);
		$('#total_amt').val(payTotal);		
			
		$('#couponAmt').html('');		
		$('#serviceTax').html('<td colspan="3"><div class="total">Service Tax ( '+ document.getElementById('tax').value +'% ) : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ service_tax +'</span></div></td>');
		
$('#payTotal').html('<td colspan="3"><div class="total">Total : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ payTotal +'</span></div></td>');
		*/				
			/*$('#total').html('<div class="total">Coupon Code Invalid</div><div class="total">Total Pay Amt : <span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+ document.getElementById('total_amt').value +'</span></div>');*/
			
		 }
	   }
	 });	
   }
}
