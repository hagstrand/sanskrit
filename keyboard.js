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

/**
	class Keyboard
**/
function Keyboard() {
	this.rownames = ['', 'Gutteral', 'Palatal', 'Cerebral', 'Dental', 'Labial'];
	this.buffer = [];  // array of keys to the alphabet table
	this.config = {
		showTypingWindow: true,
		showAnalytics: false,
		showTranslit: true,
		translitUsingHypens: true,
	}
}

Keyboard.prototype = {
	setup: function(container) {
		var s = this.drawKeypad();
		container.innerHTML = s;
		this.drawKeys();
		this.attachDomEventHandlers();
		this.enforceConfig();
	},

	enforceConfig: function() {
		this.toggleTyping( this.config.showTypingWindow);
		this.toggleAnalytics( this.config.showAnalytics);
		this.toggleTranslit( this.config.showTranslit);
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

		sanal = '';
		sanal += '<div id="analytics">';
		sanal += '<fieldset>';
		sanal += '<legend>Sounds Like</legend>';
		sanal += '<label for="soundn" ><input id="soundn" type="checkbox" class="anchor" />N</label>';
		sanal += '<label for="soundm" ><input id="soundm" type="checkbox" class="anchor" />M</label>';
		sanal += '<label for="soundh" ><input id="soundh" type="checkbox" class="anchor" />H</label>';
		sanal += '<label for="soundt" ><input id="soundt" type="checkbox" class="anchor" />T</label>';
		sanal += '<label for="soundd" ><input id="soundd" type="checkbox" class="anchor" />D</label>';
		sanal += '</fieldset>';
		sanal += '<fieldset>';
		sanal += '<legend>Looks Like</legend>';
		sanal += '<label for="look3" ><input id="look3"  type="checkbox" class="anchor" />3</label>';
		sanal += '<label for="lookb3"><input id="lookb3" type="checkbox" class="anchor" />backward 3</label>';
		sanal += '<label for="looks" ><input id="looks"  type="checkbox" class="anchor" />S</label>';
		sanal += '<label for="looko" ><input id="looko"  type="checkbox" class="anchor" />hangdown o</label>';
		sanal += '<label for="look4" ><input id="look4"  type="checkbox" class="anchor" />4</label>';
		sanal += '</fieldset>';
		sanal += '<fieldset>';
		sanal += '<legend>Roof</legend>';
		sanal += '<label for="halfroof"><input id="halfroof" type="checkbox" class="anchor" />half</label>';
		sanal += '<label for="fullroof"><input id="fullroof" type="checkbox" class="anchor" />full</label>';
		sanal += '</fieldset>';
		sanal += '<fieldset>';
		sanal += '<legend>Frame</legend>';
		sanal += '<label for="frameright" ><input id="frameright"  type="checkbox" />right</label>';
		sanal += '<label for="framecenter"><input id="framecenter" type="checkbox" />center</label>';
		sanal += '<label for="framenone"  ><input id="framenone"   type="checkbox" />none</label>';
		sanal += '</fieldset>';
		sanal += '</div>';

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
		s += '<tr class="colhdr"><td class="noborder"></td><td class="hdr" colspan="9">Consonant</td><td class="hdr" colspan="6">Vowel</td></tr>';

		// second row: soft/hard/short/long/dipthong
		s += '<tr class="colhdr">';
		s += '<td class="noborder"></td><td class="hdr" colspan="2">Hard</td><td class="hdr" colspan="3">Soft</td><td class="hdr">Soft</td><td class="hdr">Hard</td><td class="hdr">Soft</td>';
		s += '<td class="hdr">Ending</td><td class="hdr" colspan="2">Short</td><td class="hdr" colspan="2">Long</td><td class="hdr" colspan="2">Dipthong</td>';
		s += '</tr>';

		// third row: unaspirate/aspirate/letter/diacritic, embed subtables
		s += '<tr class="colhdr">';
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
		s += '<tr id="analytics"><td colspan="16" class="noborder">'+sanal+'</td></tr>';

		// end big table
		s += '</table>';

		// settings dialog
		s += '<div hidden id="keypad_settings" class="panel popup">';
			s += '<p class=tright><icon name="xbox" hide="keypad_settings"></icon></p>';
			s += '<p>';
			s += 'Mode:';
			s += '<button toggle="mode" id="modelearn" class="down">Learn</button>';
			s += '<button toggle="mode" id="modetype">Type</button>';
			s += '</p>';
			s += '<p>';
			s += '<label for="toggletranslit"><input type="checkbox" checked id="toggletranslit">Transliteration</label>';
			s += '</p>';
		s += '</div>';

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
				self.highTag( tag, boo);
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
				self.highTag( tag, boo);
				event.target.classList.toggle('selected');
			}, false);
		}

		$('clear').addEventListener('click', function(event) {
			$('tbs').value = '';
			$('tbt').value = '';
			self.buffer = [];
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

	highTag: function(tag, boo) {
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

	getId: function(a) {
		return 'cell_'+a.r+'_'+a.c;
	},

	toggleTyping: function(force) {
		this.config.showTypingWindow = (typeof(force) == 'undefined') ? !this.config.showTypingWindow : force;
		toggleAttribute($('typing'), 'hidden', '', !this.config.showTypingWindow);
	},

	toggleAnalytics: function(force) {
		this.config.showAnalytics = (typeof(force) == 'undefined') ? !this.config.showAnalytics : force;

		// column headers
		var colhdrs = document.getElementsByClassName('colhdr');
		for (var i=0; i<colhdrs.length; i++) {
			e = colhdrs[i];
			toggleAttribute(colhdrs[i], 'hidden', '', !this.config.showAnalytics);
		}

		// row headers
		var rowhdrs = document.getElementsByClassName('rowhdr');
		for (var i=0; i<rowhdrs.length; i++) {
			toggleAttribute(rowhdrs[i], 'hidden', '', !this.config.showAnalytics);
		}

		// special handling of the dipthong columns
		if (this.config.showAnalytics) {
			$('dipthong_letter_hdr').appendChild($('dipthong_letter_subtable'));
			$('dipthong_diacritic_hdr').appendChild($('dipthong_diacritic_subtable'));
		}
		else {
			$('dipthong_letter_container').appendChild($('dipthong_letter_subtable'));
			$('dipthong_diacritic_container').appendChild($('dipthong_diacritic_subtable'));
		}
		toggleAttribute($('dipthong_letter_subhdr'), 'hidden', '', !this.config.showAnalytics);
		toggleAttribute($('dipthong_diacritic_subhdr'), 'hidden', '', !this.config.showAnalytics);

		// row of fieldsets
		toggleAttribute($('analytics'), 'hidden', '', !this.config.showAnalytics);
	},

	toggleTranslit: function(force) {
		this.config.showTranslit = (typeof(force) == 'undefined') ? !this.config.showTranslit : force;
		var boo = this.config.showTranslit;
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
		if (this.config.showTypingWindow) {
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
	},
}

window.addEventListener('load', function(evt) {
	// set up keyboard
	keyboard = new Keyboard();
	keyboard.setLanguage('sa');

	// attach leftnav menu
	$('showtypewriter').addEventListener('click', function(evt) {
		keyboard.toggleTyping();
	}, false);
	$('showanalytics').addEventListener('click', function(evt) {
		keyboard.toggleAnalytics();
	}, false);
	$('showtranslit').addEventListener('click', function(evt) {
		keyboard.toggleTranslit();
	}, false);
}, false);

onScriptLoaded = function() {
	keyboard.setup($('content'));
}
