$(document).ready(function() {
	var buildPatch = [{	
		patchName: '',
		patchMerchant: '',
		patchLiveDate: '',
		patchLiveTime: '',
		patchCreativeDate: '',
		patchCreativeTime: '',
		patchProdIDDate: '',
		patchProdIDTime: '',
		patchFolder: '',
		patchPSD: '',
		patchLookbook: [],
		patchGraphicHeader: [],
		patchSiloBanner: [],
		patchPromoTile: []
	}];
	var merchant = '';

// Validation color change 
	$('.form-control').focusout(function() {
		if($(this).val != '') {
			$(this).css('color','#8bc34a');
			$(this).addClass('validated');
		};
	}); 

// Patch Name Input
	$('#editPatchName').blur(function() {
		if($(this).val() != '') {
			patchKey = $('#editPatchName').val()
			patchName =  patchKey + ' Lookbook'; 
			buildPatch[0].patchName = patchName;
		// Add 'Lookbook' to title
			$('#editPatchName').val(patchName);
		// Add predictive merchant
			predictiveMerchant(patchKey);
		}
	});
// remove 'Lookbook' title from patchName as required
	$('#editPatchName').focus(function() {
		if($(this).val() != '') {
			nameValue = $(this).val().replace('Lookbook','');
			$(this).val(nameValue);
		}
	})

// Automatic Merchant Fill
	function predictiveMerchant(patchKey) {
		patchKey = patchKey.toLowerCase();
		var nameSplit = patchKey.split(' ');

		console.log(nameSplit);

		for(x = 0; x < nameSplit.length; x++) {
			if(!$.inArray(nameSplit[x], ['shoes', 'slides', 'heels', 'weitzman'])) {
				console.log('IS');
				merchant = 'Ashley Spaulding';
			} else {
				merchant = '';
			}
		}
		// if ([('shoes', 'slides', 'heels', 'weitzman')].indexOf(nameSplit) >= 0) {
		// 	console.log('TTU');
		// 	merchant = 'Ashley Spaulding';
		// 	console.log(merchant);
		// }

		// switch(term) {
	 //       		case "shoe":
	 //       		case "slides":
	 //       		case "heels":
	 //       		case "weitzman":
	 //       			merchant = 'Ashley Spaulding';
	 //       			break;
		// 		case "sunglass":
		// 		case "accessories":
		// 			merchant = 'Michelle Mrowka';	
		// 			break;
		// 		case "men":
		// 		case "home":
		// 			merchant = 'Judy Liu';	
		// 			break;				
		// 		case "active":
		// 		case "swim":
		// 		case "contemporary":
		// 		case "cusp":
		// 			merchant = 'Natasha Burns';	
		// 			break;	
		// 		case "beauty":
		// 		case "fragrance":
		// 			merchant = 'Nicolas Ochoa';	
		// 			break;	
		// 		case "fisher":
		// 		case "special":
		// 			merchant = 'Gentry Rush';	
		// 			break;
		// 		case "yurman":
		// 		case "jewel":
		// 		case "ippolita":
		// 		case "precious":
		// 			merchant = 'Lauren Perella';	
		// 			break;									
		// 		default:
		// 			merchant = 'Courtney Carruth / Jennifer Berke';
		// 	}; // EoF Merchant Switch
		merchant = merchant;



		if(merchant != '') {
			$('#editMerchant').val(merchant);
			buildPatch[0].patchMerchant = merchant;
			console.log(buildPatch[0].patchMerchant);
		};
	};

// Merchant Input
	$('#editMerchant').blur(function() {
		merchant =  $('#editMerchant').val();
		buildPatch[0].patchMerchant = merchant;
		console.log( buildPatch[0].patchMerchant);
	});

// Patch Live Date
	$('#editLiveDate').blur(function() {
		var liveDate = $('#editLiveDate').val();
		$('#editLiveTime').val('17:00').css('color','#8bc34a');
		
		dateFill(liveDate);

		function dateFill(liveDate) {
			hex = new Date(liveDate);
			var idDue = new Date(hex.setDate(hex.getDate() - 1));
			var creative = new Date(idDue);
			var creativeDue = new Date(creative.setDate(creative.getDate() - 5));

			function setTime(creativeDue, idDue) {
				var creativeDate = creativeDue.getFullYear() + "-" + ("0"+(creativeDue.getMonth()+1)).slice(-2) + "-" + ("0" + creativeDue.getDate()).slice(-2);
				var productIDDate = idDue.getFullYear() + "-" + ("0"+(idDue.getMonth()+1)).slice(-2) + "-" + ("0" + idDue.getDate()).slice(-2);	
				$('#editCreativeDate').val(creativeDate).css('color','#8bc34a');
				$('#editCreativeTime').val('17:00').css('color','#8bc34a');
				$('#editProdIDDate').val(productIDDate).css('color','#8bc34a');
				$('#editProdIDTime').val('09:00').css('color','#8bc34a');
			}

			if(idDue.getDay() === 6) {
				idDue = new Date(hex.setDate(hex.getDate() - 1));
				setTime(creativeDue, idDue);
			} else 
			if(idDue.getDay() === 0) {
				idDue = new Date(hex.setDate(hex.getDate() - 2));
				setTime(creativeDue, idDue);	
			} else {
				setTime(creativeDue, idDue);		
			}
			buildPatch[0].patchLiveDate = $('#editLiveDate').val();
			buildPatch[0].patchLiveTime = $('#editLiveTime').val();
			buildPatch[0].patchCreativeDate = $('#editCreativeDate').val();
			buildPatch[0].patchCreativeTime = $('#editCreativeTime').val();
			buildPatch[0].patchProdIDDate = $('#editProdIDDate').val();
			buildPatch[0].patchProdIDTime = $('#editProdIDTime').val();
		};

	// Generate Folder Name based on field inputs (date + patchName)
		if($('#editPatchName').hasClass('validated')) {
			var parseDate = new Date(liveDate);
			var spcStrip = $('#editPatchName').val().split(' ').join('').split('Lookbook').join('').split("'").join('');
			function parseTime(time) {
				var time = time;
				switch(time) {
					case '17:00':
						return '5pm';
						break;
					case '15:00':
						return '3pm';
						break;
					case '09:00':
						return '9am';
						break;
					default:
						return '';
				};
			};
			$('#editFolder').val(("0"+(parseDate.getMonth()+1)).slice(-2) + "_" + ("0" + parseDate.getDate()).slice(-2) + "_" + parseDate.getFullYear().toString().substr(2,2) + "_" + parseTime($('#editLiveTime').val()) + "_" + "LkBk_" + spcStrip);
			buildPatch[0].patchFolder = $('#editFolder').val();
		};
	});

	$('#editPSD').blur(function() {
		var creativeURI = $('#editPSD').val().replace("afp://nm93fs3/E_Creative_Intranet_Site","http://nmo_creative");
		$('#editPSD').val(creativeURI);
		buildPatch[0].patchPSD = creativeURI;
	});

	function savePatch(text, filename){
	  	var a = document.createElement('a');
	  	a.setAttribute('href', 'data:text/plain;charset=utf-u,'+ encodeURIComponent(text));
	  	a.setAttribute('download', filename);
	  	a.click()
	};	

	$('#saveEdits').click(function() {
		savePatch(JSON.stringify(buildPatch[0]), buildPatch[0].patchFolder + '.json');
	});

	function loadFile() {
		// var readerTarget = $('#loadFile');
		// var upload = readerTarget[0].files[0];
		// if (upload) {
		// 	var fr = new FileReader();
		// 	fr.onload = function() {
		// 		var jsonPass = JSON.parse(fr.result);
		// 		buildPatch = buildPatch.concat(jsonPass);
		// 		loadPatch(jsonPass);
		// 	};
		// 	fr.readAsText(upload);
		// } 

	};

	$('#fileSubmit').click(function() {
		$('#loadFileModal').css('display','none');
		$('.underlay').css('display','none','z-index','-1');
		loadFile();
	});

	function loadPatch(jsonPass) {
		buildPatch[0].patchName = jsonPass.patchName;
		$('#editPatchName').empty().val(buildPatch[0].patchName);

		buildPatch[0].patchMerchant = jsonPass.patchMerchant;
		$('#editMerchant').empty().val(buildPatch[0].patchMerchant);

		buildPatch[0].patchLiveDate = jsonPass.patchLiveDate;
		$('#editLiveDate').empty().val(buildPatch[0].patchLiveDate);

		buildPatch[0].patchLiveTime = jsonPass.patchLiveTime;
		$('#editLiveTime').empty().val(buildPatch[0].patchLiveTime);

		buildPatch[0].patchCreativeDate = jsonPass.patchCreativeDate;
		$('#editCreativeDate').empty().val(buildPatch[0].patchCreativeDate);

		buildPatch[0].patchCreativeTime = jsonPass.patchCreativeTime;
		$('#editCreativeTime').empty().val(buildPatch[0].patchCreativeTime);

		buildPatch[0].patchProdIDDate = jsonPass.patchProdIDDate;
		$('#editProdIDDate').empty().val(buildPatch[0].patchProdIDDate);

		buildPatch[0].patchProdIDTime = jsonPass.patchProdIDTime;
		$('#editProdIDTime').empty().val(buildPatch[0].patchProdIDTime);

		buildPatch[0].patchFolder = jsonPass.patchFolder;
		$('#editFolder').empty().val(buildPatch[0].patchFolder);

		buildPatch[0].patchPSD = jsonPass.patchPSD;
		$('#editPSD').empty().val(buildPatch[0].patchPSD);

		$('#lookbookList').empty();
		$('#graphicheaderList').empty();
		$('#siloBannerList').empty();
		$('#promoTileList').empty();

		for(x = 0; x < jsonPass.patchLookbook.length; x++) {
			buildPatch[0].patchLookbook.push( jsonPass.patchLookbook[x] );
			$('#lookbookList').append('<li>' + buildPatch[0].patchLookbook[x] + '</li>');	
		};
		for(x = 0; x < jsonPass.patchGraphicHeader.length; x++) {
			buildPatch[0].patchGraphicHeader.push( jsonPass.patchGraphicHeader[x] );
			$('#graphicheaderList').append('<li>' + buildPatch[0].patchGraphicHeader[x] + '</li>');	
		};
		for(x = 0; x < jsonPass.patchSiloBanner.length; x++) {
			buildPatch[0].patchSiloBanner.push( jsonPass.patchSiloBanner[x] );
			$('#siloBannerList').append('<li>' + buildPatch[0].patchSiloBanner[x] + '</li>');	
		};
		for(x = 0; x < jsonPass.patchPromoTile.length; x++) {
			buildPatch[0].patchPromoTile.push( jsonPass.patchPromoTile[x] );			
			$('#promoTileList').append('<li>' + buildPatch[0].patchPromoTile[x] + '</li>');	
		};						
	};

// Add lookbook Category IDs 
	$('#editLookbookID').keypress(function(e) {
	    if(e.which == 13) {
	    	addPatchID('Lookbook');
	    }
	});
	$('#editLookBookIDbtn').click(function() {
		addPatchID('Lookbook');
	});
// Add Graphic Header Category IDs 
	$('#editGraphicHeaderID').keypress(function(e) {
	    if(e.which == 13) {
	    	addPatchID('GraphicHeader');
	    }
	});
	$('#editGraphicHeaderIDbtn').click(function() {
		addPatchID('GraphicHeader');
	});
// Add Silo Banner Category IDs 
	$('#editSiloID').keypress(function(e) {
	    if(e.which == 13) {
	    	addPatchID('SiloBanner');
	    }
	});
	$('#editSiloIDbtn').click(function() {
		addPatchID('SiloBanner');
	});	
// Add Promo Tile Category IDs 
	$('#editPromoTile').keypress(function(e) {
	    if(e.which == 13) {
	    	addPatchID('PromoTile');
	    }
	});
	$('#editPromoTilebtn').click(function() {
		addPatchID('PromoTile');
	});	

	function addPatchID(idType) {
		switch(idType) {
			case 'Lookbook':
				buildPatch[0].patchLookbook.push( $('#editLookbookID').val() );
				$('#lookbookList').append('<li>' + $('#editLookbookID').val() + '</li>');
				$('#editLookbookID').val('');
				break;
			case 'GraphicHeader':
				buildPatch[0].patchGraphicHeader.push( $('#editGraphicHeaderID').val() );
				$('#graphicheaderList').append('<li>' + $('#editGraphicHeaderID').val() + '</li>');
				$('#editGraphicHeaderID').val('');
				break;	
			case 'SiloBanner':
				buildPatch[0].patchSiloBanner.push( $('#editSiloID').val() );
				$('#siloBannerList').append('<li>' + $('#editSiloID').val() + '</li>');
				$('#editSiloID').val('');
				break;	
			case 'PromoTile':
				buildPatch[0].patchPromoTile.push( $('#editPromoTile').val() + '.html');
				$('#promoTileList').append('<li>' + $('#editPromoTile').val() + '.html</li>');
				$('#editPromoTile').val('');
				break;												
			default: ''
		}
	};

	function generateEmail() {
		var patchDate = buildPatch[0].patchLiveDate.substr(5,2) + '.' + buildPatch[0].patchLiveDate.substr(8,2) + '.' + buildPatch[0].patchLiveDate.substr(0,4);
		var dueDate = buildPatch[0].patchProdIDDate.substr(5,2) + '.' + buildPatch[0].patchProdIDDate.substr(8,2) + '.' + buildPatch[0].patchProdIDDate.substr(0,4);
		var today = new Date();
		var approvalDate = (today.getMonth() + 1) + '.' + today.getDate() + '.' + today.getYear();
		var patchTime = buildPatch[0].patchLiveTime;
			if (buildPatch[0].patchLiveTime === '17:00') { 
				patchTime = '5pm'; 
			}
		var creativeCopy = '<span style="font-weight:bold;">Creative Lookbook Turnover [' + buildPatch[0].patchName + '] Approvals + ProductIDs Due ' + dueDate + '</strong></span><br /><br />' +
			'Please review the following ' + buildPatch[0].patchName + ' and provide Product IDs in order of their appearance in the design file by <span style="color:red; font-weight:bold;">' + dueDate + '</span><br /><br />' +
			'<span style="font-weight:bold;">Creative Lookbook Turnover</span><br />' +
			buildPatch[0].patchName + '<br /><br />' +
			'<span style="font-weight:bold;"> Desktop Comp:</span><br />' + 
			buildPatch[0].patchPSD + '</span>';
		
		var approvalsCopy = '<span style="font-weight:bold;">The ' + patchDate + ' [ ' + buildPatch[0].patchName + ' ] NM Merchant & Dept Manager approval by 5pm ' + approvalDate +'<br/><br/>' +
			'<span style="font-weight: bold;"><span style="font-weight:bold>The <span style="color: red;"> ' + patchDate + ' ' + buildPatch[0].patchName + '</span> has been posted online at:</span><br />' +
			'http://www.neimanmarcus.com/i/category/' + buildPatch[0].patchLookbook[0] + '/c.cat?cacheCheckSeconds=1</span><br/><br/>' +
			'Please proof it and <span style="color:red;">respond</span> with changes or your approval by <span style="color: red; font-weight: bold;">5pm ' + approvalDate + ' </span><br/><br/>' +
			'<span style="font-weight: bold; color: green;">Merchant: ' + buildPatch[0].patchMerchant + '</span><br/><br/>' +
			'<span style="font-weight: bold;">' + buildPatch[0].patchName + '<br/>' +
			'<span style="color:red;">' + patchDate + ' - ' + patchTime + '</span></span><br/><br/>' +
			'<span style="font-weight:bold;">Lookbook</span><br/>' +
			'http://www.neimanmarcus.com/i/category/' + buildPatch[0].patchLookbook[0] + '/c.cat?cacheCheckSeconds=1<br/><br/>' +
			'<span style="font-weight:bold;">Graphic Headers:</span><br/>' +
			listLoop(1) + '<br/><br/>' +
			'<span style="font-weight:bold;">Silo Banners:</span><br/>' +
			listLoop(2) + '<br/><br/>' +
			'<span style="font-weight:bold;">Promotile:</span><br/>' +	
			'http://wn.ref1.nmg/category/promotiles/' + buildPatch[0].promoTile + '<br/>';

		var scheduleCopy = '<span style="font-weight:bold;">Please schedule the [ ' + buildPatch[0].patchName + ' ] for ' + patchDate + ', ' + patchTime + '</span><br/><br/>' +
		    'Please schedule the following folder on <span style="color:red; font-weight:bold;"> ' + patchDate + ', ' + patchTime + '</span>:<br/><br/>' +
		    '<span style="font-weight:bold;">' + buildPatch[0].patchName + '</span><br/>' +
		    '<span style="color:grey; font-weight:bold;"> ' + buildPatch[0].patchFolder + '</span><br/><br/>' +
		    'Thank you!';

		function listLoop(type) {
			var listOutput = [];
			if(type === 1) {
				asset = buildPatch[0].patchGraphicHeader;
			}
			if(type === 2) {
				asset = buildPatch[0].patchSiloBanner;
			}
			asset.forEach(function(assetReturn) {
				listOutput.push('http://wn.ref1.nmg/i/category/' + assetReturn + '/c.cat?cacheCheckSeconds=1<br/>');
			});
			return listOutput.join('');
		};

		$('#creativeEmail').html(creativeCopy);
		$('#approvalsEmail').html(approvalsCopy);
		$('#scheduleEmail').html(scheduleCopy);
	};

// Copy to Clipboard
	function selectText(containerid) {
		var container = document.getElementById(containerid);
		var range;
		
		if (container.innerHTML === '')
			return;
		
		if (document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(container);
			range.select();
			document.execCommand("copy");
		}
		else if (window.getSelection) {	
			range = document.createRange();
			range.selectNodeContents(container);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
			document.execCommand("copy");
		}
	}	

// Button presses
	$('#patchDetailTab').click(function() {
		$('#patchDetails').css('display','block');

		$('#generateScheduleEmail').css('display','none');		
		$('#generateApprovalsEmail').css('display','none');
		$('#generateCreativeEmail').css('display','none');
	});
	$('#creativeEmailTab').click(function() {
		$('#generateCreativeEmail').css('display','block');

		$('#patchDetails').css('display','none');
		$('#generateApprovalsEmail').css('display','none');		
		$('#generateScheduleEmail').css('display','none');		
		generateEmail();
	});
	$('#approvalEmailTab').click(function() {
		$('#generateApprovalsEmail').css('display','block');

		$('#generateCreativeEmail').css('display','none');
		$('#patchDetails').css('display','none');
		$('#generateScheduleEmail').css('display','none');
		generateEmail();
	});
	$('#scheduleEmailTab').click(function() {
		$('#generateScheduleEmail').css('display','block');

		$('#generateApprovalsEmail').css('display','none');
		$('#generateCreativeEmail').css('display','none');
		$('#patchDetails').css('display','none');
		generateEmail();
	});

	$('#refreshEmail').click(function() {
		generateEmail();	
	});
	$('#refreshApprovalsEmail').click(function() {
		generateEmail();
	});
	$('#refreshScheduleEmail').click(function() {
		generateEmail();
	});	

	$('#copyCreativeEmail').click(function() {
		selectText('creativeEmail');
	});

	$('#copyApprovalsEmail').click(function() {
		selectText('approvalsEmail');
	});

	$('#copyScheduleEmail').click(function() {
		selectText('scheduleEmail');
	});

	$('.modal-toggle').click(function() {
		$('#loadFileModal').css('display','block');
		$('.underlay').css('display','block','z-index','9');
	});
	$('.modal-close').click(function() {
		$('.underlay').css('display','none');
		$('#loadFileModal').css('display','none');
	});
	$('.underlay').click(function() {
		$('.underlay').css('display','none');
		$('#loadFileModal').css('display','none','z-index','-1');
	});

		var jqxhr = $.getJSON( "http://nmo_creative/intranet/NMO/2017/05_2017/05_19_17_LkBk_Marc_Jacobs_PreFall_Live_05_22/05_21_17_5pm_LkBk_MarcJacobsPre-Fall.json", function() {
		  console.log( "success" );
		})
		  .done(function() {
		    console.log( "second success" );
		  })
		  .fail(function() {
		    console.log( "error" );
		  })
		  .always(function() {
		    console.log( "complete" );
		  });
		 
		// Perform other work here ...
		 
		// Set another completion function for the request above
		jqxhr.complete(function() {
		  console.log( "second complete" );
		});	

}); // EoF Document Ready Function




