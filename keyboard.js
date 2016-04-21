/**
	class Keyboard
**/
function Keyboard() {
	this.rownames = ['', 'Gutteral', 'Palatal', 'Cerebral', 'Dental', 'Labial'];
	this.buffer = [];  // array of keys to the alphabet table
	this.typing = true;
}

Keyboard.configdefault = {	
	mode: 'typewriter',  // typewriter or learning
	showtranslit: 'on',  // on or off
}

Keyboard.prototype = {
	setup: function(container) {
		var s = this.drawKeypad();
		container.innerHTML = s;
		this.drawKeys();
		this.attachDomEventHandlers();
		this.initConfig();
	},

	getConfig: function(name) {
		var value = localStorage.getItem(name);
		console.log(['localStorage get', name, value]);
		if (!value) {   // (value === null)
			value = Keyboard.configdefault[name];
		}
		return value;
	},
	setConfig: function(name, value) {
		localStorage.setItem(name, value);
		console.log(['localStorage set', name, value]);
		if (name == 'mode') {
			if (value == 'typewriter') {
				keyboard.toggleAnalytics(false);
				keyboard.toggleTyping(true);
			} 
			else if (value == 'learning') {
				keyboard.toggleAnalytics(true);
				keyboard.toggleTyping(false);
			} 
		}
		else if (name == 'showtranslit') {
			var b = (value == 'on') ? true : false;
			this.toggleTranslit(b);
		}
		return value;
	},
	initConfig: function() {
		var mode = this.setConfig( 'mode', this.getConfig('mode'));
		var showtranslit = this.setConfig( 'showtranslit', this.getConfig('showtranslit'));
		$('showtypewriter').checked = (mode == 'typewriter');
		$('showanalytics').checked = (mode == 'learning');
		$('showtranslit').checked = (showtranslit == 'on');
	},

	drawKeypad: function() {
		// typing subtable
		var skybd = '<table id="keyboard_subtable" class="sub"><tr>';
		skybd += '<td class="noborder hog"><textarea id="tbs" class="typingwindow devanagari"></textarea></td>';
		skybd += '<td class="noborder"><button id="clear">Clear</button></td>';
		skybd += '<td class="noborder hog"><textarea id="tbt" class="typingwindow translit"></textarea></td>';
		skybd += '</tr></table>';

		// digit subtable
		var sdigit = '<table id="digit_subtable" class="sub"><tr class="noborder">';
		var row = 6;
		for (var col=1; col<16; col++) {
			id = 'cell_' + row + '_' + col;
			sdigit += '<td id="' + id + '" class="key"></td>';
		}
		sdigit += '</tr></table>';

		// analytics subtable
		sanal = '';
		sanal += '<table id="analytics"><tr>';
		sanal += '<td><fieldset>';
		sanal += '<legend>Sounds Like</legend>';
		sanal += '<table>';
		sanal += '<tr><td><td class="hdr pool" tag="soundn">N</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="soundm">M</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="soundh">H</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="soundt">T</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="soundd">D</td></tr>';
		sanal += '</table></fieldset></td>';
		sanal += '<td><fieldset>';
		sanal += '<legend>Looks Like</legend>';
		sanal += '<table id="lookslike">';
		sanal += '<tr><td><td class="hdr pool" tag="look3" >3</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="lookb3">backward 3</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="looks" >S</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="looko" >hangdown o</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="look4" >4</td></tr>';
		sanal += '</table></fieldset></td>';
		sanal += '<td><fieldset>';
		sanal += '<legend>Roof</legend>';
		sanal += '<table>';
		sanal += '<tr><td><td class="hdr pool" tag="halfroof">half</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="fullroof">full</td></tr>';
		sanal += '</table></fieldset></td>';
		sanal += '<td><fieldset>';
		sanal += '<legend>Frame</legend>';
		sanal += '<table>';
		sanal += '<tr><td><td class="hdr pool" tag="frameright" >right</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="framecenter">center</td></tr>';
		sanal += '<tr><td><td class="hdr pool" tag="framenone"  >none</td></tr>';
		sanal += '</table></fieldset></td>';
		sanal += '<td>';
		sanal += '<button id="clearselection" >Clear Selection</button>';
		sanal += '</td>';
		sanal += '</table>';

		// two vowel dipthong subtables
		var sv = '<table id="dipthong_letter_subtable" class="sub">';
		var sd = '<table id="dipthong_diacritic_subtable" class="sub">';
		var row = 2;
		for (var i=0; i<7; i++) {
			if (i==0) {
				sv += '<tr><td class="hdr" id="dipthong_letter_subhdr">Letter</td></tr>';
				sd += '<tr><td class="hdr" id="dipthong_diacritic_subhdr">Diacritic</td></tr>';
			}
			else if (i==1 || i==6) {
				sv += '<tr><td class="spacer">&nbsp;</td></tr>';
				sd += '<tr><td class="spacer">&nbsp;</td></tr>';
			}
			else {
				sv += '<tr><td id="cell_'+row+'_14" class="key"></td></tr>';
				sd += '<tr><td id="cell_'+row+'_15" class="key"></td></tr>';
				row++;
			}
		}
		sv += '</table>';
		sd += '</table>';

		// big table starts here
		var s = '<div id="keypad"><table>';

		// typing
		s += '<tr id="typing"><td colspan="16" class="noborder">' + skybd + '</td></tr>';

		// first row: consonant, ending, vowel
		s += '<tr class="colhdrrow"><td class="noborder"></td><td class="hdr" colspan="9">Consonant</td><td class="hdr" colspan="6">Vowel</td></tr>';

		// second row: soft/hard/short/long/dipthong
		s += '<tr class="colhdrrow">';
		s += '<td class="noborder"></td><td class="hdr" colspan="2">Hard</td><td class="hdr" colspan="3">Soft</td><td class="hdr">Soft</td><td class="hdr">Hard</td><td class="hdr">Soft</td>';
		s += '<td class="hdr">Ending</td><td class="hdr" colspan="2">Short</td><td class="hdr" colspan="2">Long</td><td class="hdr" colspan="2">Dipthong</td>';
		s += '</tr>';

		// third row: unaspirate/aspirate/letter/diacritic, embed subtables
		s += '<tr class="colhdrrow">';
		s += '<td class="noborder"></td><td class="hdr">Unaspirate</td><td class="hdr">Aspirate</td><td class="hdr">Unaspirate</td><td class="hdr">Aspirate</td><td class="hdr">Nasal</td><td class="hdr" tag="semivowel">Semi-vowel</td><td class="hdr">Sibilant</td><td class="hdr">Aspirate</td>';
		s += '<td class="hdr">Diacritic</td><td class="hdr">Letter</td><td class="hdr">Diacritic</td><td class="hdr">Letter</td><td class="hdr">Diacritic</td>';
		s += '<td rowspan="6" id="dipthong_letter_hdr" class="noborder">' + sv + '</td><td rowspan="6" id="dipthong_diacritic_hdr" class="noborder">' + sd + '</td>';
		s += '</tr>';

		// draw keypad rows and columns
		var numcols=13;
		var numrows = 5;
		var a;
		var cell = '';
		for (var row=1; row<=numrows; row++) {
			s += '<tr>';
			s += '<td class="rowhdr hdr" id="rowhdr_' + row + '"">'+this.rownames[row]+'</td>';
			for (var col=1; col<=(numcols); col++) {
				var id = 'cell_' + row + '_' + col;
				s += '<td class="key" id="' +id+ '">&nbsp;</td>';
			}
			if (row==1) {
				s += '<td rowspan="5" class="noborder" id="dipthong_letter_container"></td>';
				s += '<td rowspan="5" class="noborder" id="dipthong_diacritic_container"></td>';
			}
			s += '</tr>';
		}

		// digits, spacebar, special
		s += '<tr id="digits"><td colspan="16" class="noborder">'+sdigit+'</td></tr>';

		// analytics
		s += '<tr><td id="analyticscontainer" colspan="16" class="noborder">'+sanal+'</td></tr>';

		// end big table
		s += '</table>';

		s += '</div>';
		return s;
	},

	drawKeys: function() {
		var i;
		var cell = '';
		var id = '';
		var a;
		for (var i in bahasa.alphabet) {
			a = bahasa.alphabet[i];
			id = this.getId(a);
			if ($(id)) {
				cell  = '<div class="devanagari">'+a.s+'</div>';
				cell += '<div class="translit hidden">'+a.t+'</div>';
				$(id).innerHTML = cell;
				$(id).setAttribute('u', i);
			}
		}

		// spacebar
		id = 'cell_6_11';
		cell  = '<div class="devanagari">space</div>';
		cell += '<div class="translit hidden"></div>';
		$(id).innerHTML = cell;
		$(id).setAttribute('u', 0x0020);

		// hide the empty cells
		for (var i=0; i<bahasa.empties.length; i++) {
			var a = bahasa.empties[i];
			var id = this.getId(a);
			$(id).classList.add('noborder');
		}
	},

	attachDomEventHandlers: function(row) {
		var self = this;

		// keys
		var a, e;
		for (var i in bahasa.alphabet) {
			a = bahasa.alphabet[i];
			id = this.getId(a);
			e = $(id);
			if (e) {
				e.addEventListener('click', function(event) {
					self.onkey(event);
				});
			}
		}

		// analytics checkboxes
		var a = document.querySelectorAll('#analytics input[type=checkbox]');
		var e;
		for (var i=0; i<a.length; i++) {
			e = a[i];
			e.addEventListener('click', function(event) {
				var tag = event.target.id;
				var boo = event.target.checked;
				self.highTag( event, tag, boo);
				event.target.classList.toggle('selected', boo);
			})
		}

		// row/column headers
		var a = document.querySelectorAll('td.hdr');
		var e;
		for (var i=0; i<a.length; i++) {
			e = a[i];
			e.addEventListener('click', function(event) {
				var tag = (event.target.getAttribute('tag')) ? event.target.getAttribute('tag') : event.target.innerHTML.toLowerCase();
				var boo = !event.target.classList.contains('selected');
				self.highTag( event, tag, boo);
				event.target.classList.toggle('selected', boo);
			}, false);
		}

		// clear typing button
		$('clear').addEventListener('click', function(event) {
			self.clearTyping();
			$('tbs').value = '';
			$('tbt').value = '';
			self.buffer = [];
		});

		// clear selection button
		$('clearselection').addEventListener('click', function(event) {
			self.unhighAll();
		});

		window.addEventListener('keyup', function(event) {
		    if (event.keyCode === 88 && event.altKey) {   // alt-x
				self.promptDeveloper();
		        return false;
		    }
		});

		$('tbs').addEventListener('input', function(event) {
			self.oninput(event);
		}, false);
	},

	clearTyping: function() {
		$('tbs').value = '';
		$('tbt').value = '';
		this.buffer = [];
	},

	highTag: function(event, tag, boo) {
		if (!event.ctrlKey) {
			this.unhighAll();
		}
		var to = bahasa.tags[tag];
		for (var m in bahasa.alphabet) {
			ao = bahasa.alphabet[m];
			if (ao[to.t] == to.v) {
				id = this.getId(ao);
				if (boo) {
					$(id).classList.add('selected');
				}
				else {
					$(id).classList.remove('selected');
				}
			}
		}
	},

	unhighAll: function(tag, boo) {
		var keys = document.querySelectorAll('.selected');
		for (var i=0; i<keys.length; i++) {
			e = keys[i];
			e.classList.remove('selected');
		}
	},

	getId: function(a) {
		return 'cell_'+a.r+'_'+a.c;
	},

	toggleTyping: function(force) {
		this.unhighAll();
		this.clearTyping();
		var b = force;
		this.typing = b;
		toggleAttribute($('typing'), 'hidden', '', !b);
	},

	toggleAnalytics: function(force) {
		var b = force;

		// column headers
		var colhdrrows = document.getElementsByClassName('colhdrrow');
		for (var i=0; i<colhdrrows.length; i++) {
			e = colhdrrows[i];
			toggleAttribute(colhdrrows[i], 'hidden', '', !b);
		}

		// row headers
		var rowhdrs = document.getElementsByClassName('rowhdr');
		for (var i=0; i<rowhdrs.length; i++) {
			toggleAttribute(rowhdrs[i], 'hidden', '', !b);
		}

		// special handling of the dipthong columns
		if (b) {
			$('dipthong_letter_hdr').appendChild($('dipthong_letter_subtable'));
			$('dipthong_diacritic_hdr').appendChild($('dipthong_diacritic_subtable'));
		}
		else {
			$('dipthong_letter_container').appendChild($('dipthong_letter_subtable'));
			$('dipthong_diacritic_container').appendChild($('dipthong_diacritic_subtable'));
		}
		toggleAttribute($('dipthong_letter_subhdr'), 'hidden', '', !b);
		toggleAttribute($('dipthong_diacritic_subhdr'), 'hidden', '', !b);

		// row of fieldsets
		toggleAttribute($('analytics'), 'hidden', '', !b);
	},

	toggleTranslit: function(force) {
		var boo = force;
		var keys = document.querySelectorAll('div.translit');
		for (var i=0; i<keys.length; i++) {
			e = keys[i];
			if (boo) {
				e.classList.remove('hidden');
			}
			else {
				e.classList.add('hidden');
			}
		}
	},

	// user has typed on the real keyboard
	oninput: function(event) {
		var s = $('tbs').value;
		this.buffer = bahasa.getBufferFromString(s);
		this.redrawTypingWindows(event);
	},

	// user has clicked a key on our page
	onkey: function(event) {
		var e = event.target.parentElement;

		// if in typing mode, add this char to the window
		if (this.typing) {
			var u = e.getAttribute('u');
			if (!u) return;

			// insert the character at the caret position in textarea and buffer
			var selStart = $('tbs').selectionStart;
			var selEnd = $('tbs').selectionEnd;
			var out = selEnd - selStart;
			this.buffer.splice(selStart, out, parseInt(u));
			var s = bahasa.getStringFromBuffer(this.buffer);
			$('tbs').value = s;
			$('tbs').selectionStart = $('tbs').selectionEnd = (selStart + 1);
			$('tbs').focus();

			this.redrawTypingWindows(event);
		}

		// if NOT in typing mode, highlight the key
		else {
			if (!event.ctrlKey) {
				this.unhighAll();
			}
			e.classList.toggle('selected');
		}
	},

	redrawTypingWindows: function(event) {
		//$('tbt').value = this.buffer;
		//$('tbt').value = bahasa.getStringFromBuffer(this.buffer);
		$('tbt').value = bahasa.getTranslitFromBuffer(this.buffer);
	},

	promptDeveloper: function() {
		// redraw the four display strings
		var tbs = $('tbs').value;  // sanskrit
		var tbt = $('tbt').value;  // translit
		var tbc = '';  // components
		var tbu = '';  // unicode
		var numComponents = 1;

		var comma = ',';
		var hyphen = '-';

		var len = this.buffer.length;
		var u, a;  // current character
		var un, an; // next character
		var up, ap; // previous character
		var tween = false;
		var hasSpace = bahasa.bufferContainsSpace(this.buffer);
		for (var i=0; i<len; i++) {
			u = this.buffer[i];
			a = bahasa.alphabet[u];  // current charcter
			un = (i<len-1) ? this.buffer[i+1] : null;
			an = bahasa.alphabet[un];  // next character

			// if current char is letter, and prev char is not space, this is beginning of syllable
			tween = ((a.b == 'l' && ap && ap.b != ' '));

			// components: syllables separated by commas, or words separated by spaces
			if (hasSpace) {
				if (a.s == ' ') {
					tbc += comma;
					numComponents++;
				}
				else {
					tbc += a.s;
				}
			}
			else {
				if (tween) {
					tbc += comma;
					numComponents++;
				}
				tbc += a.s;
			}

			// unicode: symbols separated by commas
			if (tbu) {
				tbu += comma;
			}
			tbu += a.u;

			up = u;
			ap = bahasa.alphabet[up];  // previous character
		}

		var s = "insert into flash.quest (q, a, components, numcomponents) values ('$1', '$2', '$3', $4)";
		s = s.replace('$1', tbs);
		s = s.replace('$2', tbt);
		s = s.replace('$3', tbc);
		s = s.replace('$4', numComponents);
		prompt('',s);
	},

	setLanguage: function(lang) {
		appendScript('alphabet/' + lang + '.js');
		console.log('loading alphabet ' + lang);
	},
}

window.addEventListener('load', function(evt) {
	// set up keyboard
	keyboard = new Keyboard();
	keyboard.setLanguage('sa');

	// attach leftnav menu
	$('showtypewriter').addEventListener('click', function(evt) {
		keyboard.setConfig('mode', 'typewriter');
	}, false);
	$('showanalytics').addEventListener('click', function(evt) {
		keyboard.setConfig('mode', 'learning');
	}, false);
	$('showtranslit').addEventListener('click', function(evt) {
		keyboard.setConfig('showtranslit', (evt.currentTarget.checked ? 'on' : 'off'));
	}, false);
}, false);

onAlphabetLoaded = function() {
	console.log('alphabet loaded');
	keyboard.setup($('content'));
}


/*
// this will make a call to a separate application
bahasa.practice = function(event) {
	var selector = '.key.selected';
	var ra = document.querySelectorAll(selector);
	var cards = [];
	var r,o;
	for (var i=0; i<ra.length; i++) {
		r = ra[i];
		o = {
			i:parseInt(r.getAttribute('u')),
			n:i,
			q:r.querySelector('div:nth-child(1)').innerHTML,
			t:r.querySelector('div:nth-child(2)').innerHTML,
			a:r.querySelector('div:nth-child(2)').innerHTML,
		};
		cards.push(o);
	}
	var name = 'Sanskrit';		
	var dir = 'qa';
	flash.program.loadData(name, dir, cards);
	flash.minimal.expand($('deskexpander'), $('deskcontainer'))
};
*/

