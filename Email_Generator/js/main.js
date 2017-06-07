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
		patchPromoTile: [],
		patchGHDrive: '',
		patchSBDrive: '',
		patchICID: '',
	}];
	var merchant;
	var liveDate;

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
		folderName();
	});

// remove 'Lookbook' title from patchName as required
	$('#editPatchName').focus(function() {
		if($(this).val() != '') {
			nameValue = $(this).val().replace('Lookbook','');
			$(this).val(nameValue);
		}
	});

// Automatic Merchant Fill
	function predictiveMerchant(patchKey) {
		patchKey = patchKey.toLowerCase();

		var shoes = ['shoe','slide','heel','weitzman'];
		var accessories = ['sunglass','accessories','accessory','handbag','hand'];
		var home = ['home','house'];
		var contemporary = ['contemporary','cusp',"women's swim",'active'];
		var beauty = ['fragrance','beauty','makeup'];
		var special = ['fisher','special','petite','plus'];
		var jewelry = ['yurman','pj','bj','precious','bejeweled','jewel','ippolita'];
		var filters = [shoes, accessories, home, contemporary, beauty, special, jewelry];	

		var notfound = true;

		for(var z=0;z< filters.length; z++) {
			for(var e=0; e < filters[z].length; e++) {
		      	if(patchKey.includes(filters[z][e])) {
		      		switch(z) {
		          		case 0:
		            	// shoes
		            		merchant = 'Ashley Spaulding';
		              		break;
		          		case 1:
		            	//accessories
		            		merchant = 'Michelle Mrowka';
		              		break;
		            	case 2:
		            	//home
		            		merchant = 'Judy Liu';
		            		break;
		            	case 3: 
		            	//contemporary
		            		merchant = 'Natasha Burns';
		            		break;
		            	case 4:
		            	//beauty 
		            		merchant = 'Nicolas Ochoa';
		            		break;
		            	case 5:
		            	//special
		            		merchant = 'Gentry Rush';
		            		break;
		            	case 6:
		            	//jewelry
		            		merchant = 'Lauren Perella';
		            		break;
		            	default:
		            		merchant = 'Courtney Carruth / Jennifer Berke';
		          	}
		            notfound = false;
				}
		  	}
		}
		if(notfound) {
			merchant = 'Courtney Carruth / Jennifer Berke';			
		}

		if(merchant != '') {
			$('#editMerchant').val(merchant);
			buildPatch[0].patchMerchant = merchant;
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
		buildPatch[0].patchLiveDate = $('#editLiveDate').val();
		liveDate = buildPatch[0].patchLiveDate;

		dateFill(liveDate);
		folderName();
	});

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
			if($('#editLiveTime').val() === '') {
				$('#editLiveTime').val('17:00').css('color','#8bc34a');
			} else {
				$(this).val(buildPatch[0].patchLiveTime);
			}
			console.log(buildPatch[0].patchLiveTime);
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

	$('#editLiveTime').blur(function() {
		buildPatch[0].patchLiveTime = $('#editLiveTime').val();
		folderName();
	});

	$('#editCreativeTime').blur(function() {
		buildPatch[0].patchCreativeTime = $('#editCreativeTime').val();
	});

	$('#editProdIDTime').blur(function() {
		buildPatch[0].patchProdIDTime = $('#editProdIDTime').val();
	});	

	function folderName() {
	// Generate Folder Name based on field inputs (date + patchName)
		// if($('#editPatchName').hasClass('validated')) {
			var spcStrip = buildPatch[0].patchName.split(' ').join('').split('Lookbook').join('').split("'").join('');
			var month = buildPatch[0].patchLiveDate.substr(5,2);
			var day = buildPatch[0].patchLiveDate.substr(8,2);
			var year = buildPatch[0].patchLiveDate.substr(2,2);
			var time = buildPatch[0].patchLiveTime.replace('17:00','5pm').replace('22:00','10pm').replace('15:00','3pm').replace('09:00','9am');
			console.log(time);

			$('#editFolder').val(month + "_" + day + "_" + year + "_" + time +  "_LkBk_" + spcStrip);
			buildPatch[0].patchFolder = $('#editFolder').val();

		// };
	};

	$('#editPSD').blur(function() {
		var creativeURI = $('#editPSD').val().replace("afp://nm93fs3/E_Creative_Intranet_Site","http://nmo_creative");
		$('#editPSD').val(creativeURI);
		buildPatch[0].patchPSD = creativeURI;
	});

	$('#editGHDrive').blur(function() {
		var drive = $('#editGHDrive').val().replace('http://www.neimanmarcus.com','');
		$('#editGHDrive').val(drive);
		buildPatch[0].patchGHDrive = drive;
		console.log(buildPatch[0].patchGHDrive);		
	});

	$('#editSBDrive').blur(function() {
		var drive = $('#editSBDrive').val().replace('http://www.neimanmarcus.com','');
		$('#editSBDrive').val(drive);
		buildPatch[0].patchSBDrive = drive;
		console.log(buildPatch[0].patchSBDrive);
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
		var readerTarget = $('#loadFile');
		var upload = readerTarget[0].files[0];
		if (upload) {
			var fr = new FileReader();
			fr.onload = function() {
				var jsonPass = JSON.parse(fr.result);
				buildPatch = buildPatch.concat(jsonPass);
				loadPatch(jsonPass);
			};
			fr.readAsText(upload);
		} 

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

		buildPatch[0].patchGHDrive = jsonPass.patchGHDrive;
		$('#editGHDrive').empty().val(buildPatch[0].patchGHDrive);		

		buildPatch[0].patchSBDrive = jsonPass.patchSBDrive;
		$('#editSBDrive').empty().val(buildPatch[0].patchSBDrive);		

		buildPatch[0].patchICID = jsonPass.patchICID;

		$('#lookbookList').empty();
		$('#graphicheaderList').empty();
		$('#siloBannerList').empty();
		$('#promoTileList').empty();

		for(x = 0; x < jsonPass.patchLookbook.length; x++) {
			buildPatch[0].patchLookbook.push( jsonPass.patchLookbook[x] );
			$('#lookbookList').append('<li class="editPrev" contenteditable=true>' + buildPatch[0].patchLookbook[x] + '</li>');	
		};
		for(x = 0; x < jsonPass.patchGraphicHeader.length; x++) {
			buildPatch[0].patchGraphicHeader.push( jsonPass.patchGraphicHeader[x] );
			$('#graphicheaderList').append('<li class="editPrev" contenteditable=true>' + buildPatch[0].patchGraphicHeader[x] + '</li>');	
		};
		for(x = 0; x < jsonPass.patchSiloBanner.length; x++) {
			buildPatch[0].patchSiloBanner.push( jsonPass.patchSiloBanner[x] );
			$('#siloBannerList').append('<li class="editPrev" contenteditable=true>' + buildPatch[0].patchSiloBanner[x] + '</li>');	
		};
		for(x = 0; x < jsonPass.patchPromoTile.length; x++) {
			buildPatch[0].patchPromoTile.push( jsonPass.patchPromoTile[x] );			
			$('#promoTileList').append('<li class="editPrev" contenteditable=true>' + buildPatch[0].patchPromoTile[x] + '</li>');	
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
				$('#lookbookList').append('<li class="editPrev" contenteditable=true>' + $('#editLookbookID').val() + '</li>');
				$('#editLookbookID').val('');
				break;
			case 'GraphicHeader':
				buildPatch[0].patchGraphicHeader.push( $('#editGraphicHeaderID').val() );
				$('#graphicheaderList').append('<li class="editPrev" contenteditable=true>' + $('#editGraphicHeaderID').val() + '</li>');
				$('#editGraphicHeaderID').val('');
				break;	
			case 'SiloBanner':
				buildPatch[0].patchSiloBanner.push( $('#editSiloID').val() );
				$('#siloBannerList').append('<li class="editPrev" contenteditable=true>' + $('#editSiloID').val() + '</li>');
				$('#editSiloID').val('');
				break;	
			case 'PromoTile':
				buildPatch[0].patchPromoTile.push( $('#editPromoTile').val() + '.html');
				$('#promoTileList').append('<li class="editPrev" contenteditable=true>' + $('#editPromoTile').val() + '.html</li>');
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
		var month = buildPatch[0].patchLiveDate.substr(5,2);
		var day = buildPatch[0].patchLiveDate.substr(8,2);
		var year = buildPatch[0].patchLiveDate.substr(2,2);
		var patchTime = buildPatch[0].patchLiveTime;
			if (buildPatch[0].patchLiveTime === '17:00') { 
				patchTime = '5pm'; 
			}
		var icid;

		if(buildPatch[0].patchICID === '') {
			icid = buildPatch[0].patchFolder.substr(10) + '_' + month + day + year;
		} else {
			icid = buildPatch[0].patchICID;
		}

		console.log(icid);


		var creativeCopy = '<span style="font-weight:bold;">Creative Lookbook Turnover [' + buildPatch[0].patchName + '] Approvals + ProductIDs Due ' + dueDate + '</strong></span><br /><br />' +
			'Please review the following ' + buildPatch[0].patchName + ' and <span style="font-weight:bold; color: red;">provide Product IDs and Depictions</span> in order of their appearance in the design file by <span style="color:red; font-weight:bold;">' + dueDate + '</span><br /><br />' +
			'<span style="font-weight:bold;">Creative Lookbook Turnover</span><br />' +
			buildPatch[0].patchName + '<br /><br />' +
			'<span style="font-weight:bold;"> Desktop Comp:</span><br />' + 
			buildPatch[0].patchPSD + '</span>';
		
		var approvalsCopy = '<span style="font-weight:bold;">The ' + patchDate + ' [ ' + buildPatch[0].patchName + ' ] NM Merchant & Dept Manager approval by <span style="font-weight:bold; color: red;">5pm ' + approvalDate +'</span><br/><br/>' +
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
			'http://wn.ref1.nmg/category/promotiles/' + buildPatch[0].patchPromoTile + '<br/>';

		var scheduleCopy = '<span style="font-weight:bold;">Please schedule the [ ' + buildPatch[0].patchName + ' ] for ' + patchDate + ', ' + patchTime + '</span><br/><br/>' +
		    'Please schedule the following folder on <span style="color:red; font-weight:bold;"> ' + patchDate + ', ' + patchTime + '</span>:<br/><br/>' +
		    '<span style="font-weight:bold;">' + buildPatch[0].patchName + '</span><br/>' +
		    '<span style="color:grey; font-weight:bold;"> ' + buildPatch[0].patchFolder + '</span><br/><br/>' +
		    'Thank you!';

		var icidCopy = '<table style="width:100%;">' +
					    	'<tr style="font-weight:bold;">' +
					    		'<td style="width: 15%;">' + patchDate + '</td>' +
					    		'<td style="width: 40%;">' + buildPatch[0].patchName + '</td>' +
					    		'<td style="width: 30%;">ICID</td>' +
					    		'<td style="width: 15%;">Category</td>' +
					    	'</tr>' +
					    	'<tr>' +
					    		'<td></td>' +
					    		'<td>Lookbook </td>' +
					    		'<td>' + icid + '</td>' +
					    		'<td>' + buildPatch[0].patchLookbook[0] + '</td>' +
					    	'</tr>' +
					    		'<td></td>' +
					    		'<td>Graphic Headers </td>' +
					    		icidLoop(1, icid) +
					    	'</tr>' +
					    	'</tr>' +
					    		'<td></td>' +
					    		'<td>Silo Banners </td>' +
					    		icidLoop(2, icid) +
					    	'</tr>' +
					    	'<tr>' +
					    		'<td></td>' +
					    		'<td>Promotile</td>' +
					    		'<td>pt_' + icid + '</td>' +
					    	'</tr>' +						    						    	
					    '</table>';

			var ghCode = '<pre><p>&lt;figure class="figure-full-width"&gt;</p>' +
  							 '<p>&lt;a href="' + buildPatch[0].patchGHDrive + '?icid=gh_' + icid + '"&gt;</p>' +
	    						'<p>&lt;picture&gt;</p>' +
	     							'<p>&lt;!--[if IE 9]&gt;&lt;video&gt;&lt;![endif]--&gt;</p>' +
	     							'<p>&lt;source media="(min-width: 768px)" srcset="/category/' + buildPatch[0].patchGraphicHeader[0] + '/r_head_long_' + month + day + year +'.jpg" /&gt;</p>' +
	          						'<p>&lt;source media="(min-width: 1px)"   srcset="/category/' + buildPatch[0].patchGraphicHeader[0] + '/m_head_long_' + month + day + year +'.jpg" /&gt;</p>' +
	     							'<p>&lt;!--[if IE 9]&gt;&lt;/video&gt;&lt;![endif]--&gt;</p>' +
	     							'<p>&lt;img src="/category/' + buildPatch[0].patchGraphicHeader[0] + '/r_head_long_' + month + day + year +'.jpg" srcset="/category/' + buildPatch[0].patchGraphicHeader[0] + '/r_head_long_' + month + day + year +'.jpg" alt="' + buildPatch[0].patchName +'" /&gt;</p>' +
	    						'<p>&lt;/picture&gt;</p>' +
  							'<p>&lt;/a&gt;</p>' +
							'<p>&lt;/figure&gt;</p></pre>';

			var sbCode = '<pre><p>&lt;figure class="figure-full-width"&gt;</p>' +
  							 '<p>&lt;a href="' + buildPatch[0].patchSBDrive + '?icid=sb_' + icid + '"&gt;</p>' +
	    						'<p>&lt;picture&gt;</p>' +
	     							'<p>&lt;!--[if IE 9]&gt;&lt;video&gt;&lt;![endif]--&gt;</p>' +
	     							'<p>&lt;source media="(min-width: 768px)" srcset="/category/' + buildPatch[0].patchSiloBanner[0] + '/r_head_long_' + month + day + year +'.jpg" /&gt;</p>' +
	          						'<p>&lt;source media="(min-width: 1px)"   srcset="/category/' + buildPatch[0].patchSiloBanner[0] + '/m_head_long_' + month + day + year +'.jpg" /&gt;</p>' +
	     							'<p>&lt;!--[if IE 9]&gt;&lt;/video&gt;&lt;![endif]--&gt;</p>' +
	     							'<p>&lt;img src="/category/' + buildPatch[0].patchSiloBanner[0] + '/r_head_long_' + month + day + year +'.jpg" srcset="/category/' + buildPatch[0].patchSiloBanner[0] + '/r_head_long_' + month + day + year +'.jpg" alt="' + buildPatch[0].patchName +'" /&gt;</p>' +
	    						'<p>&lt;/picture&gt;</p>' +
  							'<p>&lt;/a&gt;</p>' +
							'<p>&lt;/figure&gt;</p></pre>';

			var ptCode = '<pre><p>&lt;figure class="figure-full-width"&gt;</p>' +
    						'<p>&lt;a href="' + buildPatch[0].patchGHDrive + '?icid=pt_' + icid + '"&gt;</p>' +
        					'<p>&lt;img src="/category/promotiles/event/' + icid.substr(0, icid.length - 7) + '_' + month + year + '/Promotile_' + month + day + year + '.jpg" alt="' + buildPatch[0].patchName + '" style="border: 1px solid #ccc;" /&gt;</p>'+
    						'<p>&lt;/a&gt;</p>' +
							'<p>&lt;/figure&gt;</p></pre>';							

		function listLoop(type) {
			var listOutput = [];
			if(type === 1) {
				asset = buildPatch[0].patchGraphicHeader;
			}
			if(type === 2) {
				asset = buildPatch[0].patchSiloBanner;
			}
			asset.forEach(function(assetReturn) {
				if(assetReturn != '') {
					listOutput.push('http://wn.ref1.nmg/i/category/' + assetReturn + '/c.cat?cacheCheckSeconds=1<br/>');
				}
			});
			return listOutput.join('');
		};

		function icidLoop(type, code) {
			var code = icid;
			var icidOutput = [];
			var counter = 0;
			if (type === 1) {
				prefix = 'gh';
				typeArray = buildPatch[0].patchGraphicHeader;
			}
			if (type === 2) {
				prefix = 'sb';
				typeArray = buildPatch[0].patchSiloBanner;
			}
			typeArray.forEach(function(typeReturn) {
				if(counter === 0) {
					icidOutput.push('<td>' + prefix + '_' + code + '</td><td>' + typeReturn + '</td>');
				} else {
					icidOutput.push('</tr><td></td><td></td><td>' + prefix + '_' + code + '_' + counter + '</td><td>' + typeReturn + '</td>');
				}
				counter++;
			});
			return icidOutput.join('');
		};

		$('#creativeEmail').html(creativeCopy);
		$('#approvalsEmail').html(approvalsCopy);
		$('#scheduleEmail').html(scheduleCopy);
		$('#icidOutput').html(icidCopy);
		$('#ghOutput').html(ghCode);
		$('#sbOutput').html(sbCode);
		$('#ptOutput').html(ptCode);
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
		$('#icidGenerator').css('display','none');
		$('#ssGenerator').css('display','none');		
	});
	$('#creativeEmailTab').click(function() {
		$('#generateCreativeEmail').css('display','block');

		$('#patchDetails').css('display','none');
		$('#generateApprovalsEmail').css('display','none');		
		$('#generateScheduleEmail').css('display','none');
		$('#icidGenerator').css('display','none');	
		$('#ssGenerator').css('display','none');					
		generateEmail();
	});
	$('#approvalEmailTab').click(function() {
		$('#generateApprovalsEmail').css('display','block');

		$('#generateCreativeEmail').css('display','none');
		$('#patchDetails').css('display','none');
		$('#generateScheduleEmail').css('display','none');
		$('#icidGenerator').css('display','none');
		$('#ssGenerator').css('display','none');				
		generateEmail();
	});
	$('#scheduleEmailTab').click(function() {
		$('#generateScheduleEmail').css('display','block');

		$('#generateApprovalsEmail').css('display','none');
		$('#generateCreativeEmail').css('display','none');
		$('#patchDetails').css('display','none');
		$('#icidGenerator').css('display','none');
		$('#ssGenerator').css('display','none');				
		generateEmail();
	});
	$('#icidTab').click(function() {
		$('#icidGenerator').css('display','block');

		$('#generateApprovalsEmail').css('display','none');
		$('#generateCreativeEmail').css('display','none');
		$('#patchDetails').css('display','none');
		$('#generateScheduleEmail').css('display','none');
		$('#ssGenerator').css('display','none');				
		generateEmail();
	});
	$('#ssTab').click(function() {
		$('#ssGenerator').css('display','block');

		$('#generateApprovalsEmail').css('display','none');
		$('#generateCreativeEmail').css('display','none');
		$('#patchDetails').css('display','none');
		$('#generateScheduleEmail').css('display','none');	
		$('#icidGenerator').css('display','none');			
		generateEmail();
	});		

	$('#icidGenerator').css('display','none');

	$('#refreshEmail').click(function() {
		generateEmail();	
	});
	$('#refreshApprovalsEmail').click(function() {
		generateEmail();
	});
	$('#refreshScheduleEmail').click(function() {
		generateEmail();
	});	
	$('#refreshICID').click(function() {
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

	$('#copyICID').click(function() {
		selectText('icidOutput');
	});
	$('#copyGH').click(function() {
		selectText('ghOutput');
	});
	$('#copySB').click(function() {
		selectText('sbOutput');
	});	
	$('#copyPT').click(function() {
		selectText('ptOutput');
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


	$(document).on('click','.editPrev',function(){
		var currentVal = $(this).text();

		$(this).addClass('editing');
		$(this).keypress(function(e) {
		    if(e.which == 13) {
		    	e.preventDefault();
				for(x = 0; x < buildPatch[0].patchGraphicHeader.length; x++) {
					if(currentVal.indexOf(buildPatch[0].patchGraphicHeader[x]) > -1) {
						buildPatch[0].patchGraphicHeader[x] = $(this).text();
					}
				}
				for(x = 0; x < buildPatch[0].patchLookbook.length; x++) {
		    	e.preventDefault();					
					if(currentVal.indexOf(buildPatch[0].patchLookbook[x]) > -1) {
						buildPatch[0].patchLookbook[x] = $(this).text();
					}
				}
				for(x = 0; x < buildPatch[0].patchSiloBanner.length; x++) {
		    	e.preventDefault();
					if(currentVal.indexOf(buildPatch[0].patchSiloBanner[x]) > -1) {
						buildPatch[0].patchSiloBanner[x] = $(this).text();
					}
				}
				for(x = 0; x < buildPatch[0].patchPromoTile.length; x++) {
		    	e.preventDefault();
					if(currentVal.indexOf(buildPatch[0].patchPromoTile[x]) > -1) {
						buildPatch[0].patchPromoTile[x] = $(this).text();
					}
				}

				if($(this).hasClass('editing')) {
					$(this).removeClass('editing');
				}									
		    }
		});
		$(this).blur(function() {
			for(x = 0; x < buildPatch[0].patchGraphicHeader.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchGraphicHeader[x]) > -1) {
					buildPatch[0].patchGraphicHeader[x] = $(this).text();
					}
			}
			for(x = 0; x < buildPatch[0].patchLookbook.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchLookbook[x]) > -1) {
					buildPatch[0].patchLookbook[x] = $(this).text();
				}
			}
			for(x = 0; x < buildPatch[0].patchSiloBanner.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchSiloBanner[x]) > -1) {
					buildPatch[0].patchSiloBanner[x] = $(this).text();
				}
			}
			for(x = 0; x < buildPatch[0].patchPromoTile.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchPromoTile[x]) > -1) {
					buildPatch[0].patchPromoTile[x] = $(this).text();
				}
			}
			
			if($(this).hasClass('editing')) {
				$(this).removeClass('editing');
			}			
		});

		function editItem() {
			for(x = 0; x < buildPatch[0].patchGraphicHeader.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchGraphicHeader[x]) > -1) {
					buildPatch[0].patchGraphicHeader[x] = $(this).text();
					}
			}
			for(x = 0; x < buildPatch[0].patchLookbook.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchLookbook[x]) > -1) {
					buildPatch[0].patchLookbook[x] = $(this).text();
				}
			}
			for(x = 0; x < buildPatch[0].patchSiloBanner.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchSiloBanner[x]) > -1) {
					buildPatch[0].patchSiloBanner[x] = $(this).text();
				}
			}
			for(x = 0; x < buildPatch[0].patchPromoTile.length; x++) {
				if(currentVal.indexOf(buildPatch[0].patchPromoTile[x]) > -1) {
					buildPatch[0].patchPromoTile[x] = $(this).text();
				}
			}
		};

	});



}); // EoF Document Ready Function


