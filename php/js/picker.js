/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 /**
 * Author: NG, Yik-wai Jason
 * Contact & Support: ywng@ust.hk
 * The Hong Kong University of Science and Technology
 * Data Visualization, CSE, HKUST
 */
 
	/**
	 * Mouse Picker related functions
	 */
	var handleMouseOverGraph = function(event) {	
		//console.log(event.pageX);
		//console.log(event.pageY);
		var mouseX = event.pageX-90;
		var mouseY = event.pageY-50;
	
		if(mouseX >= 0 && mouseX <=950 && mouseY >= 0 && mouseY <= 460) {
			//console.log(mouseX+"  "+mouseY);

			//show date 
			displayDateForPositionX(mouseX);

			// show the dots
			
			fund.select("circle").transition().duration(0)
				 .attr("cx",  function(d) {
				 	 var index=findIndexGivenDateTime(mouseX,d.price_array);
				 	 return x(parseDate(d.price_array[index].datetime));
				 })
                 .attr("cy",  function(d) {
                 	 var index=findIndexGivenDateTime(mouseX,d.price_array);
                 	 return y(parseFloat(d.price_array[index].price));
                 })
                 .style("display", function(d) {if(d.vis=="True"){return "initial";}else{return "none";}}); 

		} else {
			// hide the dots
			fund.select("circle").transition().duration(0)
		    	.style("display", "none");
		    DateLbl.select('text').remove();
	
		}
	}
	
	
	var handleMouseOutGraph = function(event) {	
		// hide the dots
		fund.select("circle").transition().duration(0)
		    .style("display", "none");
		DateLbl.select('text').remove();
	}
	
	/**
	* Display the data & date values at position X 
	*/
	var displayDateForPositionX = function(xPosition) {
		
		var dateToShow=x.invert(xPosition);
		
		DateLbl.select('text').remove();
		DateLbl.append("text")
			.attr("x",width-350)
            .attr("y", 0)
			.text(dateToShow)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "Gray");
	
		/*
		
		//modify the picker display of each funds	
		//do only when we have a defined update of index. For some of the date, e.g. Sunday, no such record, the index will be undefined
		if((currIndex>=0 )&& (currIndex<data2[0].priceList.length)){ 
		
			pickerValue.select("text").transition()//update the unit price label 
				.text( function (d) { 
					return d.priceList[currIndex].price;
				});
			
			valueChange.select("text").transition()//update % value change label
				.text( function (d) {
					var percentChange;				
					if(currIndex==d.priceList.length-1)
						percentChange=(d.priceList[currIndex].price-d.priceList[currIndex-1].price)/d.priceList[currIndex-1].price*100;
					else
					    percentChange=(d.priceList[d.priceList.length-1].price-d.priceList[currIndex].price)/d.priceList[currIndex].price*100;
					if(percentChange<0){
						return "(-"+percentChange.toFixed(2)+"%)" 
					}else{
						return "(+"+percentChange.toFixed(2)+"%)" 
					}
				})
				.attr("fill", function (d) {
					var percentChange;				
					if(currIndex==d.priceList.length-1)
						percentChange=(d.priceList[currIndex].price-d.priceList[currIndex-1].price)/d.priceList[currIndex-1].price*100;
					else
					    percentChange=(d.priceList[d.priceList.length-1].price-d.priceList[currIndex].price)/d.priceList[currIndex].price*100;
					if(percentChange<0){
						return "red" 
					}else{
						return "black" 
					}
				});
		}
		*/
	}
	

