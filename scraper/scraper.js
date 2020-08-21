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
	"console.log(ingreRoot);" +
"}" +
"ingredients = '';" +
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
				"console.log(currentNode);" +
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

"let recipeObject = {" +
	"name," +
	"ingredients" +
"};" +

"if( !window.ReactNativeWebView || !window.ReactNativeWebView.postMessage){ " +
	"window.ReactNativeWebView = { postMessage: console.log };" +
"}" +

"window.ReactNativeWebView.postMessage(JSON.stringify(recipeObject));";