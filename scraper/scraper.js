export default 
"let name = '';" +
"{" +
	"let nameRoot = null;" +
	"const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);" +
	"let currentNode = walker.nextNode();" +
	"let candidateNodes = [];" +
	"while (currentNode) {" +
		// is this node a possibility
		"const className = (typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase();" +
		"let attr = currentNode.attributes.getNamedItem('itemprop');" +
		"let match = className.includes('recipe-');" +
		"match = match || (attr ? attr.value : '').toLowerCase() == 'name';" +
		"match = match || className.includes('assettitle');" +
		"match = match || className.includes('headline-');" +
		"match = match || className.includes('title-');" +
		"match = match || className.includes('recipeparttitle');" +
		"match = match || className.includes('headline');" +
		"if (match) {" +
			"candidateNodes.push(currentNode);" +
		"}" +
		"currentNode = walker.nextNode();" +
	"}" +
	// look for relevant elements
	
	"nameRoot = candidateNodes.find(e => e.nodeName.toLowerCase() == 'h1');" +
	"nameRoot = nameRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('-title'));" +
	"nameRoot = nameRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('-wrapper'));" +
	"nameRoot = nameRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div');" +
	"const itemWalker = document.createTreeWalker(nameRoot, NodeFilter.SHOW_TEXT);" +
	"currentNode = itemWalker.currentNode;" +
	"while(currentNode) {" +
		"if(currentNode.length > 0) {" +
			"name += currentNode.data.toString().trim();" +
		"}" +
		"currentNode = itemWalker.nextNode();" +
	"}" +
"}" +


// search for times container
"let prepTime = '';" +
"let cookTime = '';" +
"let itemDescList = [];" +
"{" +
	"const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);" +
	"let currentNode = walker.currentNode;" +
	"let candidateNodes = [];" +
	"while (currentNode) {" +
		// am I of interest
		"const classNames = (typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase().split(' ');" +
		// break up the class attribute
		"let match = classNames.some(n => {" +
			"return (n.includes('recipe') && n.includes('attributes')) || (n.includes('recipe') && (n.includes('detail') || n.includes('info'))) || n.includes('content-wrapper') || n.includes('preptime');" +
		"});" +

		"if (match) {" +
			"candidateNodes.push(currentNode);" +
		"}" +
		"currentNode = walker.nextNode();" +
	"}" +
	
	// look for relevant elements
	"let timesRoot = null;" +
	// timesRoot = candidateNodes.find(e => e.nodeName.toLowerCase() == 'span');
	// timesRoot = timesRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'p');
	"timesRoot = timesRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('part'));" + // for bettycrocker
	"timesRoot = timesRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('container'));" + // for pioneer woman
	"timesRoot = timesRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('facts'));" + // for food.com
	"timesRoot = timesRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ul' && e.className.toLowerCase().includes('time'));" + // for food network
	"timesRoot = timesRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div');" +

	"if (timesRoot) {" +
		// get items
		"candidateNodes = [];" +
		"const itemWalker = document.createTreeWalker(timesRoot, NodeFilter.SHOW_ELEMENT);" +
		"currentNode = itemWalker.currentNode;" +
			
		// if ul has un-classified li children, assume that's what we want
		"if (currentNode && currentNode.nodeName.toLowerCase() == 'ul') {" +
			"for (let i of currentNode.childNodes) {" +
				"if (i.nodeType == Node.ELEMENT_NODE && i.className === '') {" +
					"candidateNodes.push(i);" +
				"}" +
			"}" +
			"currentNode = candidateNodes.length > 0 ? null : currentNode;" +
		"}" +

		// move past the parent
		"currentNode = currentNode != null ? itemWalker.nextNode() : null;" +
		
		"const acceptableNodeNames = ['li', 'div'];" +
		"const rulesCheck = [" +
			"{" +
				"class: 'recipe-meta-item'," +
				"exclude: ['body', 'header']" +
			"}" +
		"]" +
			
		"while (currentNode) {" +
			// am I of interest
			"const nodeName = currentNode.nodeName.toLowerCase();" +
			"let match = acceptableNodeNames.includes(nodeName);" +
			// break up class attribute
			"const classNames = (typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase().split(' ');" +
			"if (typeof(currentNode.id) == 'string') {" +
				"idNode = currentNode.id.toLowerCase();" +
				"classNames.push(idNode);" +
			"}" +
			"match = match && classNames.some(n => {" +
				"return (n.includes('recipe') && (n.includes('item')) || (n.includes('facts'))) || (!n.includes('recipe') && (n.includes('time') || n.includes('primaryattributes')));" +
			"});" +

			"for (let i of rulesCheck) {" +
				"if (classNames.some(k => k.includes(i.class))) {" +
					"match = match && (!classNames.some(n => {" +
						"for (let j of i.exclude) {" +
							"if (n.includes(j)) {" +
								"return true;" +
							"}" +
						"}" +
						"return false;" +
					"}));" +
				"}" +
			"}" +

			"if (match) {" +
				"candidateNodes.push(currentNode);" +
			"}" +
			"currentNode = itemWalker.nextNode();" +
		"}" +

		"function collectText(node) {" +
			"const textWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);" +
			"let result = '';" +
			"let currentNode = textWalker.currentNode;" +
			"while (currentNode) {" +
				"if (currentNode.length > 0) {" +
					"result += currentNode.data.toString().trim() + ' ';" +
				"}" +
				"currentNode = textWalker.nextNode();" +
			"}" +
			"return result.trim();" +
		"}" +

		"const timeRegex = /[0-9]+\s*(min|hour|hr|m)/;" +
		
		"for (let perItem of candidateNodes) {" +
			"const itemDesc = {" +
				"label: ''," +
				"value: ''" +
			"};" +

			"const perItemWalker = document.createTreeWalker(perItem, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);" +
			// handle key and label assignment
			"let atNode = perItemWalker.nextNode();" +
			"while (atNode.nodeType == Node.TEXT_NODE && atNode.data.toString().trim() == '') {" +
				"atNode = perItemWalker.nextNode();" +
			"}" +
			"itemDesc.label = collectText(atNode);" +
			"atNode = perItemWalker.nextSibling();" +
			"while (atNode) {" +
				"itemDesc.value += collectText(atNode) + ' ';" +
				"atNode = perItemWalker.nextSibling();" +
			"}" +

			"const itemTime = itemDesc.value.toLowerCase().trim();" +
			"if (itemTime.includes('min') || itemTime.includes('hour') || itemTime.includes('hr') || itemTime.endsWith('m')) {" +
				"if (!timeRegex.test(itemTime)) {" +
					"itemDesc.value = `${itemDesc.label} ${itemDesc.value}`;" +
					// TODO: DO NOT assume the time is cook
					"itemDesc.label = 'total';" +
				"}" +
				"if (itemDesc.label.toLowerCase().includes('ready in')) {" +
					"itemDesc.label = 'Total';" +
				"}" +
				"itemDescList.push(itemDesc);" +
			"}" +
		"}" +
		

		"for (let time of itemDescList) {" +
			"if (time.label.toLowerCase().includes('prep')) {" +
				"prepTime = time.value;" +
			"} else if (time.label.toLowerCase().includes('cook')) {" +
				"cookTime = time.value;" +
			"}" +
		"}" +
		"console.log(JSON.stringify(itemDescList));" +
	"}" +
"}" +

// search for ingredients container
"let ingreRoot = null;" +
"{" + 
	"const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);" + 
	"let currentNode = walker.currentNode;" + 
	"let candidateNodes = [];" +
	"while( currentNode ) {" +
		// am I of interest
		"if( currentNode.nodeName.toLowerCase() != 'input' && " +
			"(typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase().includes('ingredients') ) {" +
			"candidateNodes.push(currentNode);" +
		"}" +
		"currentNode = walker.nextNode();" +
	"}" +
	// look for elements in certain order
	"ingreRoot = candidateNodes.find(e => e.nodeName.toLowerCase() == 'ul');" +
	"ingreRoot = ingreRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('body') );" +
	"ingreRoot = ingreRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('list') );" +
	"ingreRoot = ingreRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' );" +
	"ingreRoot = ingreRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'section');" +
	"ingreRoot = ingreRoot || candidateNodes[0];" +
	
	"if( ingreRoot ) {" +
		"const {id, className} = ingreRoot;" +
		"const matchId = id.length > 4 ? id.slice(0, id.length - 2).toLowerCase() : null;" +
		"const matchClass = className.length > 4 ? className.slice(0, className.length - 2).toLowerCase() : null;" +
		"let altRoots = candidateNodes.filter(e => e != ingreRoot && e.nodeName === ingreRoot.nodeName && (!matchId || e.id.toString().toLowerCase().startsWith(matchId)) && (!matchClass || e.className.toLowerCase().startsWith(matchClass)) );" +
		
		"if(altRoots.length > 0) {" +
			"ingreRoot = [ingreRoot].concat(altRoots);" +
		"} else {" +
			"ingreRoot = [ingreRoot];" +
		"}" +
	"} else {" +
		"ingreRoot = [];" +
	"}" +
"}" +
"let ingredients = '';" +
"if( ingreRoot.length > 0 ) {" +
	"const ingredientRegExp = /ingredient[^s]{1}|ingredient$/;" +
	"for(const root of ingreRoot) {" +
		// try to find and consolidate items
		"const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);" +
		"let currentNode = walker.nextNode();" +
		"let candidateNodes = [];" +
		"while( currentNode ) {" +
			// am I of interest
			"const nodeName = currentNode.nodeName.toLowerCase();" +
			"if( nodeName == 'div' || nodeName == 'p' || nodeName == 'li' ) {" +
				"const className = (typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase();" +
				"let isMatch = className.includes('item');" +
				"isMatch = isMatch || className.includes('line');" +
				"isMatch = isMatch || ingredientRegExp.test(className);" +

				"if( isMatch && !candidateNodes.find(e => e.contains(currentNode)) ) {" +
					"candidateNodes.push(currentNode);" +
				"}" +
			"}" +
			"currentNode = walker.nextNode();" +
		"}" +
		
		"for(let item of candidateNodes) {" +
			"let text = '';" +
			"const itemWalker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);" +
			"currentNode = itemWalker.currentNode;" +
			"while(currentNode) {" +
				"if(currentNode.length > 0) {" +
					"text += currentNode.data.toString().trim() + ' ';" +
				"}" +
				"currentNode = itemWalker.nextNode();" +
			"}" +
			"ingredients += text.trim() + '\\n';" +
		"}" +
	"}" +
"}" +

// search for directions container
"let directionRoot = null;" +
"{" +
	"const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);" +
	"let currentNode = walker.currentNode;" +
	"let candidateNodes = [];" +
	"while( currentNode ) {" +
		// am I of interest
		"if( currentNode.nodeName.toLowerCase() != 'input' && " +
			"(typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase()) {" +
			"candidateNodes.push(currentNode);" +
		"}" +
		"currentNode = walker.nextNode();" +
	"}" +
	// look for elements in certain order
	"directionRoot = candidateNodes.find(e => e.nodeName.toLowerCase() == 'ol' && e.className.toLowerCase().includes('-directions'));" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ul' && e.className.toLowerCase().includes('instructions') );" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ul' && e.className.toLowerCase().includes('directions') );" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ul' && e.className.toLowerCase().includes('steps') );" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ol' && e.className.toLowerCase().includes('steps') );" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ol' && e.className.toLowerCase().includes('list') );" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'ol');" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'section' && e.className.toLowerCase().includes('method'));" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('directions-list'));" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('directions'));" +
	"directionRoot = directionRoot || candidateNodes.find(e => e.nodeName.toLowerCase() == 'div' && e.className.toLowerCase().includes('m-body'));" +
	"directionRoot = directionRoot || candidateNodes[0];" +
	"directionRoot = directionRoot ? [directionRoot] : [];" +
"}" +
"let directions = '';" +
"if( directionRoot.length > 0 ) {" +
	"for(const root of directionRoot) {" +
		// try to find and consolidate items
		"const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);" +
		"let currentNode = walker.nextNode();" +
		"let candidateNodes = [];" +
		"while( currentNode ) {" +
			// am I of interest
			"const nodeName = currentNode.nodeName.toLowerCase();" +
			"if( nodeName == 'div' || nodeName == 'li' || nodeName == 'p') {" +
				"const className = (typeof(currentNode.className) == 'string' ? currentNode.className : '').toLowerCase();" +
				"let isMatch = className.includes('step');" +
				"isMatch = isMatch || className.includes('mb2');" +
				"isMatch = isMatch || className.includes('paragraph');" +
				"isMatch = isMatch || nodeName == 'li';" +

				"if( isMatch && !candidateNodes.find(e => e.contains(currentNode)) ) {" +
					"candidateNodes.push(currentNode);" +
				"}" +
			"}" +
			"currentNode = walker.nextNode();" +
		"}" +
		"for(let item of candidateNodes) {" +
			"let text = '';" +
			"const itemWalker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);" +
			"currentNode = itemWalker.currentNode;" +
			"while(currentNode) {" +
				"if(currentNode.length > 0) {" +
					"text += currentNode.data.toString().trim() + ' ';" +
				"}" +
				"currentNode = itemWalker.nextNode();" +
			"}" +
			"directions += text.trim() + '\\n';" +
		"}" +
	"}" +
"}" +

"let recipeObject = {" +
	"name," +
	"ingredients," +
	"directions," +
	"itemDescList" +
"};" +

"if( !window.ReactNativeWebView || !window.ReactNativeWebView.postMessage){ " +
	"window.ReactNativeWebView = { postMessage: console.log };" +
"}" +

"window.ReactNativeWebView.postMessage(JSON.stringify(recipeObject));";