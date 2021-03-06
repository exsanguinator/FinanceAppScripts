//
// ticker = the equity symbol
//
function Dividend(ticker) {
  if(typeof ticker != "string") {
    throw "ticker must be a string";
  }
  
  // http://finance.yahoo.com/q?s=WFM140509C00040000
  //   Div &amp; Yield:</th><td class="yfnc_tabledata1">1.05 (1.70%) </td>

  var url = 'finance.yahoo.com/q?s='+ ticker;
  
  var html = UrlFetchApp.fetch(url);
  var text = html.getContentText();
  
  var divIndex = text.indexOf('Yield:</th>');
  
  var divStr = text.substr(divIndex);
  
  var divStartIndex = divStr.indexOf('">');
  var divEndIndex = divStr.indexOf(' (');
  var divStr = divStr.substr(divStartIndex+2, divEndIndex - divStartIndex - 1);
  
  var dividend = +divStr;
  
  if(isNaN(dividend)) dividend = 0;
    
  return dividend;
}

function test() {
  return Dividend("WFM");
}
