const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let urlData = [];



d3.json(url).then(function(data) {
  urlData = data;


  //initialize name data to use in dropDownMenu
  function init() {
    let value = "940";
    let filter = sample => sample.id == value
  
    let name  = Object.values(data.names)
  console.log("names:", name);


  //establish sample data
  let samples = Object.values(data.samples)
  console.log("samples:", samples);

//filter sample data
  let filtered = samples.find(filter);
    let sample_values = filtered.sample_values;
    console.log('sample_values', sample_values);
    let otu_ids = filtered.otu_ids;
    console.log('otu_ids', otu_ids);
    let otu_labels = filtered.otu_labels;
    console.log('otu_labels', otu_labels);
  
    let sortSample = (sample_values.sort((a, b) => b - a)).slice(0, 10);
    console.log(sortSample)
    let valueIndex = sortSample.map(function(value) {
      return sample_values.indexOf(value);
     });
     let top_otu_ids = valueIndex.map(function(index) {
      return otu_ids[index];
     });
     let top_otu_labels = valueIndex.map(function(index) {
      return otu_labels[index];
     });
    console.log("ids",  top_otu_ids)
    console.log("labels",  top_otu_labels)

    //set default bar cahrt
      let bar = [{
        x: sortSample.reverse(),
        y: top_otu_ids.length, 
        text: otu_labels,      
        values: sortSample,
        labels: top_otu_ids,

        type: "bar", 
        orientation: "h"
      }];
     
      let layout = {
        yaxis: {tickmode: 'array', tickvals: top_otu_ids, 
        ticktext: (" OTU " + top_otu_ids)}
        
      };
    
      Plotly.newPlot("bar", bar, layout);

      //set defualt bubble chart
      let trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels, 
        mode: 'markers',
        marker: {
          size: sample_values, 
          color: otu_ids,
        }
      };
      
      let bubble = [trace1];
      
      let buLayout = {
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot("bubble", bubble, buLayout);


      //establish meta data
  let metadata = Object.values(data.metadata)
  console.log("metadata:", metadata);
  let metaFilter = metadata.find(filter);
  console.log("metaFilter:", metaFilter);
  let metaKeys = Object.keys(metaFilter)
  console.log(metaKeys)
  let metaValues = Object.values(metaFilter)
  console.log(metaValues)
  

  // set sample-metadata
  let values = [ metaKeys, metaValues]
  let demInfo = document.getElementById('sample-metadata'); 
  let listHTML = '<ul>'; 
  for (let i = 0; i < values[0].length; i++) { 
    listHTML += '<li>' + values[0][i] +': ' + values[1][i] + '</li>'; // add each item to the list
  }
  listHTML += '</ul>'; 
  demInfo.innerHTML = listHTML; 

 value = d3.select(this).property("value");

  d3.selectAll("#selDataset").on("change", getData);

  function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
   // let filter = [];
  
   if (dataset === "(value)") {
        filter = value;
    }
  // Call function to update the chart
    updatePlotly(filter);
  }

  
   //Update the restyled plot's values
    function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
  }
  



   } 
  init(); 
  });