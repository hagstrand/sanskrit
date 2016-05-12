/*
	sanskrit alphabet
*/

(function() {   // create a local scope

var alphabet = {};

alphabet.lang = 'sa'

alphabet.alphabet = {
//   index    db-id   unicode         translit filename            tags                           looks-like       sound   row/col   name
	0x0966:	{ i:6536, u:0x0966, s:'०',	t:'0'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c:10, n:''            },
	0x0967:	{ i:6537, u:0x0967, s:'१',	t:'1'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 1, n:''            },
	0x0968:	{ i:6538, u:0x0968, s:'२',	t:'2'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 2, n:''            },
	0x0969:	{ i:6539, u:0x0969, s:'३',	t:'3'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 3, n:''            },
	0x096A:	{ i:6540, u:0x096A, s:'४',	t:'4'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 4, n:''            },
	0x096B:	{ i:6541, u:0x096B, s:'५',	t:'5'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 5, n:''            },
	0x096C:	{ i:6542, u:0x096C, s:'६',	t:'6'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 6, n:''            },
	0x096D:	{ i:6543, u:0x096D, s:'७',	t:'7'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 7, n:''            },
	0x096E:	{ i:6544, u:0x096E, s:'८',	t:'8'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 8, n:''            },
	0x096F:	{ i:6545, u:0x096F, s:'९',	t:'9'  ,f:''    ,p:'d',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c: 9, n:''            },
	0x0905:	{ i:6546, u:0x0905, s:'अ',	t:'a'  ,f:'a'   ,p:'v',b:'l',m:'g',h:'t',a:' ',e:' '  ,o:'h',v:'r',g:'3',  x:' '  ,r:1,c:10, n:''            },
	0x0906:	{ i:6547, u:0x0906, s:'आ',	t:'ā'  ,f:'aa'  ,p:'v',b:'l',m:'g',h:'l',a:' ',e:' '  ,o:'h',v:'r',g:'3',  x:' '  ,r:1,c:12, n:''            },
	0x0907:	{ i:6548, u:0x0907, s:'इ',	t:'i'  ,f:'i'   ,p:'v',b:'l',m:'p',h:'t',a:' ',e:' '  ,o:'f',v:'n',g:'s',  x:' '  ,r:2,c:10, n:''            },
	0x0908:	{ i:6549, u:0x0908, s:'ई',	t:'ī'  ,f:'ii'  ,p:'v',b:'l',m:'p',h:'l',a:' ',e:' '  ,o:'f',v:'n',g:'s',  x:' '  ,r:2,c:12, n:''            },
	0x0909:	{ i:6550, u:0x0909, s:'उ',	t:'u'  ,f:'u'   ,p:'v',b:'l',m:'l',h:'t',a:' ',e:' '  ,o:'f',v:'n',g:'3',  x:' '  ,r:5,c:10, n:''            },
	0x090A:	{ i:6551, u:0x090A, s:'ऊ',	t:'ū'  ,f:'uu'  ,p:'v',b:'l',m:'l',h:'l',a:' ',e:' '  ,o:'f',v:'n',g:'3',  x:' '  ,r:5,c:12, n:''            },
	0x090B:	{ i:6552, u:0x090B, s:'ऋ',	t:'ṛ'  ,f:'r'   ,p:'v',b:'l',m:'c',h:'t',a:' ',e:' '  ,o:'f',v:'c',g:' ',  x:' '  ,r:3,c:10, n:''            },
	0x0960:	{ i:6553, u:0x0960, s:'ॠ',	t:'ṝ'  ,f:''    ,p:'v',b:'l',m:'c',h:'l',a:' ',e:' '  ,o:'f',v:'c',g:' ',  x:' '  ,r:3,c:12, n:''            },
	0x090C:	{ i:6554, u:0x090C, s:'ऌ',	t:'ḷ'  ,f:'l'   ,p:'v',b:'l',m:'d',h:'t',a:' ',e:' '  ,o:'f',v:'n',g:' ',  x:' '  ,r:4,c:10, n:''            },
	0x090F:	{ i:6555, u:0x090F, s:'ए',	t:'e'  ,f:'e'   ,p:'v',b:'l',m:' ',h:'d',a:' ',e:' '  ,o:'f',v:'n',g:' ',  x:' '  ,r:2,c:14, n:''            },
	0x0910:	{ i:6556, u:0x0910, s:'ऐ',	t:'ai' ,f:'ai'  ,p:'v',b:'l',m:' ',h:'d',a:' ',e:' '  ,o:'f',v:'n',g:' ',  x:' '  ,r:3,c:14, n:''            },
	0x0913:	{ i:6557, u:0x0913, s:'ओ',	t:'o'  ,f:'o'   ,p:'v',b:'l',m:' ',h:'d',a:' ',e:' '  ,o:'h',v:'r',g:'3',  x:' '  ,r:4,c:14, n:''            },
	0x0914:	{ i:6558, u:0x0914, s:'औ',	t:'au' ,f:'ow'  ,p:'v',b:'l',m:' ',h:'d',a:' ',e:' '  ,o:'h',v:'r',g:'3',  x:' '  ,r:5,c:14, n:''            },
	0x093E:	{ i:6559, u:0x093E, s:'ा',	t:'ā'  ,f:'aa'  ,p:'v',b:'d',m:'g',h:'l',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:1,c:13, n:''            },
	0x093F:	{ i:6560, u:0x093F, s:'ि',	t:'i'  ,f:'i'   ,p:'v',b:'d',m:'p',h:'t',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:2,c:11, n:''            },
	0x0940:	{ i:6561, u:0x0940, s:'ी',	t:'ī'  ,f:'ii'  ,p:'v',b:'d',m:'p',h:'l',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:2,c:13, n:''            },
	0x0941:	{ i:6562, u:0x0941, s:'ु',	t:'u'  ,f:'u'   ,p:'v',b:'d',m:'l',h:'t',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:5,c:11, n:''            },
	0x0942:	{ i:6563, u:0x0942, s:'ू',	t:'ū'  ,f:'uu'  ,p:'v',b:'d',m:'l',h:'l',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:5,c:13, n:''            },
	0x0943:	{ i:6564, u:0x0943, s:'ृ',	t:'ṛ'  ,f:'r'   ,p:'v',b:'d',m:'c',h:'t',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:3,c:11, n:''            },
	0x0944:	{ i:6565, u:0x0944, s:'ॄ',	t:'ṝ'  ,f:''    ,p:'v',b:'d',m:'c',h:'l',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:3,c:13, n:''            },
	0x0962:	{ i:6566, u:0x0962, s:'ॢ',	t:'ḷ'  ,f:'l'   ,p:'v',b:'d',m:'d',h:'t',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:4,c:11, n:''            },
	0x0947:	{ i:6567, u:0x0947, s:'े',	t:'e'  ,f:'e'   ,p:'v',b:'d',m:' ',h:'d',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:2,c:15, n:''            },
	0x0948:	{ i:6568, u:0x0948, s:'ै',	t:'ai' ,f:'ai'  ,p:'v',b:'d',m:' ',h:'d',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:3,c:15, n:''            },
	0x094B:	{ i:6569, u:0x094B, s:'ो',	t:'o'  ,f:'o'   ,p:'v',b:'d',m:' ',h:'d',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:4,c:15, n:''            },
	0x094C:	{ i:6570, u:0x094C, s:'ौ',	t:'au' ,f:'ow'  ,p:'v',b:'d',m:' ',h:'d',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:5,c:15, n:''            },
	0x0901:	{ i:6571, u:0x0901, s:'ँ',	t:'n'  ,f:''    ,p:'c',b:'d',m:'d',h:' ',a:' ',e:'e'  ,o:' ',v:' ',g:' ',  x:'n'  ,r:4,c: 9, n:'candrabindu' },
	0x0902:	{ i:6572, u:0x0902, s:'ं',	t:'m'  ,f:''    ,p:'c',b:'d',m:'l',h:' ',a:' ',e:'e'  ,o:' ',v:' ',g:' ',  x:'m'  ,r:5,c: 9, n:'anusvara'    },
	0x0903:	{ i:6573, u:0x0903, s:'ः',	t:'h'  ,f:''    ,p:'c',b:'d',m:'g',h:' ',a:' ',e:'e'  ,o:' ',v:' ',g:' ',  x:'h'  ,r:1,c: 9, n:'visarga'     },
	0x0915:	{ i:6574, u:0x0915, s:'क',	t:'k'  ,f:'k'   ,p:'c',b:'l',m:'g',h:'h',a:'u',e:' '  ,o:'f',v:'c',g:' ',  x:' '  ,r:1,c: 1, n:''            },
	0x0916:	{ i:6575, u:0x0916, s:'ख',	t:'kh' ,f:'kh'  ,p:'c',b:'l',m:'g',h:'h',a:'a',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:1,c: 2, n:''            },
	0x0917:	{ i:6576, u:0x0917, s:'ग',	t:'g'  ,f:'g'   ,p:'c',b:'l',m:'g',h:'s',a:'u',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:1,c: 3, n:''            },
	0x0918:	{ i:6577, u:0x0918, s:'घ',	t:'gh' ,f:'gh'  ,p:'c',b:'l',m:'g',h:'s',a:'a',e:' '  ,o:'f',v:'r',g:'x',  x:' '  ,r:1,c: 4, n:''            },
	0x0919:	{ i:6578, u:0x0919, s:'ङ',	t:'ṅ'  ,f:'ng'  ,p:'c',b:'l',m:'g',h:'s',a:'n',e:' '  ,o:'f',v:'n',g:'s',  x:'n'  ,r:1,c: 5, n:''            },
	0x091A:	{ i:6579, u:0x091A, s:'च',	t:'c'  ,f:'ch'  ,p:'c',b:'l',m:'p',h:'h',a:'u',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:2,c: 1, n:''            },
	0x091B:	{ i:6580, u:0x091B, s:'छ',	t:'ch' ,f:'chh' ,p:'c',b:'l',m:'p',h:'h',a:'a',e:' '  ,o:'f',v:'n',g:'x',  x:' '  ,r:2,c: 2, n:''            },
	0x091C:	{ i:6581, u:0x091C, s:'ज',	t:'j'  ,f:'j'   ,p:'c',b:'l',m:'p',h:'s',a:'u',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:2,c: 3, n:''            },
	0x091D:	{ i:6582, u:0x091D, s:'झ',	t:'jh' ,f:'zh'  ,p:'c',b:'l',m:'p',h:'s',a:'a',e:' '  ,o:'f',v:'r',g:'s',  x:' '  ,r:2,c: 4, n:''            },
	0x091E:	{ i:6583, u:0x091E, s:'ञ',	t:'ñ'  ,f:'nj'  ,p:'c',b:'l',m:'p',h:'s',a:'n',e:' '  ,o:'f',v:'r',g:' ',  x:'n'  ,r:2,c: 5, n:''            },
	0x091F:	{ i:6584, u:0x091F, s:'ट',	t:'ṭ'  ,f:'t'   ,p:'c',b:'l',m:'c',h:'h',a:'u',e:' '  ,o:'f',v:'n',g:'o',  x:'t'  ,r:3,c: 1, n:''            },
	0x0920:	{ i:6585, u:0x0920, s:'ठ',	t:'ṭh' ,f:'tdh' ,p:'c',b:'l',m:'c',h:'h',a:'a',e:' '  ,o:'f',v:'n',g:'o',  x:'t'  ,r:3,c: 2, n:''            },
	0x0921:	{ i:6586, u:0x0921, s:'ड',	t:'ḍ'  ,f:'d'   ,p:'c',b:'l',m:'c',h:'s',a:'u',e:' '  ,o:'f',v:'n',g:'s',  x:'d'  ,r:3,c: 3, n:''            },
	0x0922:	{ i:6587, u:0x0922, s:'ढ',	t:'ḍh' ,f:'dhv' ,p:'c',b:'l',m:'c',h:'s',a:'a',e:' '  ,o:'f',v:'n',g:'o',  x:'d'  ,r:3,c: 4, n:''            },
	0x0923:	{ i:6588, u:0x0923, s:'ण',	t:'ṇ'  ,f:'tn'  ,p:'c',b:'l',m:'c',h:'s',a:'n',e:' '  ,o:'f',v:'r',g:' ',  x:'n'  ,r:3,c: 5, n:''            },
	0x0924:	{ i:6589, u:0x0924, s:'त',	t:'t'  ,f:'tv'  ,p:'c',b:'l',m:'d',h:'h',a:'u',e:' '  ,o:'f',v:'r',g:' ',  x:'t'  ,r:4,c: 1, n:''            },
	0x0925:	{ i:6590, u:0x0925, s:'थ',	t:'th' ,f:'th'  ,p:'c',b:'l',m:'d',h:'h',a:'a',e:' '  ,o:'h',v:'r',g:' ',  x:'t'  ,r:4,c: 2, n:''            },
	0x0926:	{ i:6591, u:0x0926, s:'द',	t:'d'  ,f:'dv'  ,p:'c',b:'l',m:'d',h:'s',a:'u',e:' '  ,o:' ',v:'n',g:'o',  x:'d'  ,r:4,c: 3, n:''            },
	0x0927:	{ i:6592, u:0x0927, s:'ध',	t:'dh' ,f:'dh'  ,p:'c',b:'l',m:'d',h:'s',a:'a',e:' '  ,o:'h',v:'r',g:'x',  x:'d'  ,r:4,c: 4, n:''            },
	0x0928:	{ i:6593, u:0x0928, s:'न',	t:'n'  ,f:'n'   ,p:'c',b:'l',m:'d',h:'s',a:'n',e:' '  ,o:'f',v:'r',g:' ',  x:'n'  ,r:4,c: 5, n:''            },
	0x092A:	{ i:6594, u:0x092A, s:'प',	t:'p'  ,f:'p'   ,p:'c',b:'l',m:'l',h:'h',a:'u',e:' '  ,o:'f',v:'r',g:'4',  x:' '  ,r:5,c: 1, n:''            },
	0x092B:	{ i:6595, u:0x092B, s:'फ',	t:'ph' ,f:'ph'  ,p:'c',b:'l',m:'l',h:'h',a:'a',e:' '  ,o:'f',v:'c',g:' ',  x:' '  ,r:5,c: 2, n:''            },
	0x092C:	{ i:6596, u:0x092C, s:'ब',	t:'b'  ,f:'b'   ,p:'c',b:'l',m:'l',h:'h',a:'u',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:5,c: 3, n:''            },
	0x092D:	{ i:6597, u:0x092D, s:'भ',	t:'bh' ,f:'bh'  ,p:'c',b:'l',m:'l',h:'h',a:'a',e:' '  ,o:'h',v:'r',g:'4',  x:' '  ,r:5,c: 4, n:''            },
	0x092E:	{ i:6598, u:0x092E, s:'म',	t:'m'  ,f:'m'   ,p:'c',b:'l',m:'l',h:'h',a:'n',e:' '  ,o:'f',v:'r',g:'4',  x:'m'  ,r:5,c: 5, n:''            },
	0x092F:	{ i:6599, u:0x092F, s:'य',	t:'y'  ,f:'y'   ,p:'c',b:'l',m:'p',h:'s',a:'v',e:' '  ,o:'f',v:'r',g:'4',  x:' '  ,r:2,c: 6, n:''            },
	0x0930:	{ i:6600, u:0x0930, s:'र',	t:'r'  ,f:'r'   ,p:'c',b:'l',m:'c',h:'s',a:'v',e:' '  ,o:'f',v:'n',g:' ',  x:' '  ,r:3,c: 6, n:''            },
	0x0932:	{ i:6601, u:0x0932, s:'ल',	t:'l'  ,f:'l'   ,p:'c',b:'l',m:'d',h:'s',a:'v',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:4,c: 6, n:''            },
	0x0935:	{ i:6602, u:0x0935, s:'व',	t:'v'  ,f:'w'   ,p:'c',b:'l',m:'l',h:'s',a:'v',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:5,c: 6, n:''            },
	0x0936:	{ i:6603, u:0x0936, s:'श',	t:'ś'  ,f:'sh'  ,p:'c',b:'l',m:'p',h:'h',a:'s',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:2,c: 7, n:''            },
	0x0937:	{ i:6604, u:0x0937, s:'ष',	t:'ṣ'  ,f:'hsh' ,p:'c',b:'l',m:'c',h:'h',a:'s',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:3,c: 7, n:''            },
	0x0938:	{ i:6605, u:0x0938, s:'स',	t:'s'  ,f:'s'   ,p:'c',b:'l',m:'d',h:'h',a:'s',e:' '  ,o:'f',v:'r',g:' ',  x:' '  ,r:4,c: 7, n:''            },
	0x0939:	{ i:6606, u:0x0939, s:'ह',	t:'h'  ,f:'h'   ,p:'c',b:'l',m:'g',h:'s',a:'a',e:' '  ,o:'f',v:'n',g:' ',  x:'h'  ,r:1,c: 8, n:''            },
	0x094D: { i:0000, u:0x094D, s:'्',	t:''   ,f:''    ,p:'s',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c:12, n:'virama'      },
	0x0964: { i:0000, u:0x0964, s:'।',	t:','  ,f:''    ,p:'s',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c:13, n:'danda'       },
	0x0965: { i:0000, u:0x0965, s:'॥',	t:'.'  ,f:''    ,p:'s',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c:14, n:'double danda'},
	0x0950: { i:0000, u:0x0950, s:'ॐ',	t:'om' ,f:''    ,p:'s',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c:15, n:'om'          },
	0x0020: { i:0000, u:0x0020, s:' ',	t:' '  ,f:''    ,p:'s',b:' ',m:' ',h:' ',a:' ',e:' '  ,o:' ',v:' ',g:' ',  x:' '  ,r:6,c:11, n:'space'       },
};

alphabet.tags = {
	vowel:		{t:'p', v:'v', label:'Vowel'},
	consonant:	{t:'p', v:'c', label:'Consonant'},
	digit:		{t:'p', v:'d', label:'Digit'},
	special:	{t:'p', v:'s', label:'Special'},  // special characters

	letter:		{t:'b', v:'l', label:'Letter'},
	diacritic:	{t:'b', v:'d', label:'Diacritic'},  // "sign"

/*	
	after:		{t:'e', v:'e', label:'Ending'},  // consonant diacritics come after vowel sound
	before:		{t:'e', v:'b', label:'Before'},  // consonant letters mostly used before
	either:		{t:'e', v:'o', label:'Either'},  // some consonant letters can also be used after
*/
	ending:		{t:'e', v:'e', label:'Ending'},  // some consonant letters can also be used after

	gutteral:	{t:'m', v:'g', label:'Gutteral'},
	palatal:	{t:'m', v:'p', label:'Palatal'},
	cerebral:	{t:'m', v:'c', label:'Cerebral'},
	dental:		{t:'m', v:'d', label:'Dental'},
	labial:		{t:'m', v:'l', label:'Labial'},

	soft:		{t:'h', v:'s', label:'Soft'},      // consonant
	hard:		{t:'h', v:'h', label:'Hard'},      // consonant
	short:		{t:'h', v:'t', label:'Short'},     // vowel
	long:		{t:'h', v:'l', label:'Long'},      // vowel
	dipthong:	{t:'h', v:'d', label:'Dipthong'},  // vowel
	
	aspirate:	{t:'a', v:'a', label:'Aspirate'},
	unaspirate:	{t:'a', v:'u', label:'Unaspirate'},
	nasal:		{t:'a', v:'n', label:'Nasal'},
	semivowel:	{t:'a', v:'v', label:'Semi-vowel'},
	sibilant:	{t:'a', v:'s', label:'Sibilant'},
	aspirant:	{t:'a', v:'a', label:'Aspirant'},

	halfroof:	{t:'o', v:'h', label:'Half roof'},
	fullroof:	{t:'o', v:'f', label:'Half roof'},
	
	frameright:	{t:'v', v:'r', label:'Frame right'},
	framecenter:{t:'v', v:'c', label:'Frame center'},
	framenone:	{t:'v', v:'n', label:'Frame none'},

	look3:		{t:'g', v:'3', label:'Looks like 3'},
	lookb3:		{t:'g', v:'x', label:'Looks like backward 3'},
	looks:		{t:'g', v:'s', label:'Looks like S'},
	looko:		{t:'g', v:'o', label:'Looks like hangdown o'},
	look4:		{t:'g', v:'4', label:'Looks like 4'},

	soundn:		{t:'x', v:'n', label:'Sounds like N'},
	soundm:		{t:'x', v:'m', label:'Sounds like M'},
	soundh:		{t:'x', v:'h', label:'Sounds like H'},
	soundt:		{t:'x', v:'t', label:'Sounds like T'},
	soundd:		{t:'x', v:'d', label:'Sounds like D'},
}

alphabet.empties = [
	{r:1,c: 6},
	{r:1,c: 7},
	{r:1,c:11},
	{r:2,c: 8},
	{r:2,c: 9},
	{r:3,c: 8},
	{r:3,c: 9},
	{r:4,c: 8},
	{r:5,c: 7},
	{r:5,c: 8},
];

window.voyc.onAlphabetLoaded(alphabet);
}());
