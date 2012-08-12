// Global Variables 

var news_per_pages = 2; // News per pages
var xml_news = "";      

/*
  Extra functions 
*/

// This function load a partial from a link. Used in navigation menu

function load_page(page,id){
   $('#'+id).load(page);
}

// Function to load news from xml: notices/news.xml . 
// Initial call load the last <news_per_pages> news from xml file.

function load_last_news(xml){
 
   // Load xml file value in a global variable
   if(xml_news==""){
    xml_news = xml;
   }

   // Default values for xml and page variables: 
   xml = typeof xml !== "undefined" ? xml : xml_news;
   
   var news = $(xml),
       html = "";  
 
   var all_news = $('new',xml);

   news = all_news.slice(0,2);

   // Build news blocks.
   news.each(function(){
      html = html+"<div class='row'><div class='twelve columns'>";
      html = html + "<h3>"+$("title",this).text()+"</h3>";
      html = html + unescape($("body",this).text()) +"";
      html = html + '</div></div>';
   });   

   $('#center').html(html);
}


// Function to load news from xml: notices/news.xml . 
// Initial call load the last <news_per_pages> news from xml file.

function load_news(page,xml){
 
   // Load xml file value in a global variable
   if(xml_news==""){
    xml_news = xml;
   }

   // Default values for xml and page variables: 
   xml = typeof xml !== "undefined" ? xml : xml_news;
   page = typeof page !== "undefined" ? page : 1;

   
   var news = $(xml),
       start = 0+page-1,
       end = news_per_pages + page-1,
       html = "";  
 
   var all_news = $('new',xml),
       count = all_news.length;

   news = all_news.slice(start,end);

   // Build news blocks.
   news.each(function(){
      html = html+"<div class='row'><div class='twelve columns'>";
      html = html + "<h3>"+$("title",this).text()+"</h3>";
      html = html + unescape($("body",this).text()) +"";
      html = html + '</div></div>';
   });   

   // Build pagination menu
   if(count > news_per_pages){
      html = html + news_paginations(all_news,page);   
   }

   $('#center').html(html);
}

// Function to build pagination menu

function news_paginations(news,page)
{

 var html = '<div class="row"><div class="twelve columns"><ul class="pagination">',
     count = 1 ;
 
 for(i=0; i < (news.length % news_per_pages) +1; i++){
    // If is current page...
    if(page != count){
      html = html + '<li>';
    }else{  
      html = html + '<li class="current">';
    }
    
    html = html + '<a href="#" onclick="javascript:load_news('+count+');">'+count+'</a></li>';
    count++;
 }

 //html = html + "<li class='arrow'><a href="" onclick='javascript:load_new(xml_news,-2);'>&raquo;</a></li>";

 html = html + "</ul></div></div>";

 return html;
    
}

