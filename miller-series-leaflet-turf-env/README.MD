## Mark Miller Lecture Series Notes
### Lecture 62 index.html is organized into:

1. Head has script plugins and styling code.
2. Map Initialization
3. Layer Initialization
4. Setup Layer Control
5. Setup Draw Control
6. Location Events
7. BUOWL Functions that target data objects
8. Client Linears
9. Eagle Functions
10. Raptor Functions
11. jQuery Event Handlers
12. General Functions
---


#### Creating a Finding-Features-by-ID function:
##### PSEUDO CODE FOR FEATURE SEARCH BY ID
1. Declare the function.
2. Get array of layers.
3. Loop through all layers.
4. Compare project ID of feature to parameter passed to function.
5. Return feature if they match.
6. Return false if no match is found.
<br> 
<br>  
##### Corresponding JS Code:
```
    (1)	function returnClientLineByID(id){
    (2)		var arLayers = lyrClientLines.getLayers();
    (3)		for (i=0;i<arLayers.length-1; i++){
    (4)			var featureID = arLayers[i].feature.properties.Project;
    (5a)		if (featureID==id)  {
    (5b)			return arLayers[i];
            	}
        	}
    (6)   return false
		}
```

##### PSEUDO CODE FOR EVENT HANDLER
1. Handle click event of search button
2. Retrieve id from text box
3. Pass it to the returnProjectByID
4. If found then (i) add feature to search group layer, (ii) zoom to layer and (iii) populate sidebar with data.
5. Otherwise report an error.

- [ ] todo: refactor eliminating jquery and ajax
<br>

##### Corresponding JS Code:
```
	$("#btnFindProject").click(function(){
                var id = $("#txtFindProject").val();
                var lyr = returnClientByID(id);
                if (lyr)  {
                	if (lyr)  {
                		lyrSearch.remove();
                    }
                    lyrSearch = L.geoJSON(lyr.toGeoJSON(), {style:{color:'red', weight: 10, opacity: .5}}).addTo(mymap);     
                    mymap.fitBounds(lyr.getBounds().pad(1));
                    var att = lyr.feature.properties;
                    $("#divProjectData").html("<h4 class='text-center'>Attributes</h4>
                    <h5>Type: "+att.type+"</h5><h5>ROW width: "+att.row+width+ "m </h5>");
                }  else  {
                    $("#divProjectError").html("**** Project ID not found ****");
                }
	});

```

---

##### Notes
CONTINUE NOTES AT LECTURE 48

### Topics include:
Leaflet map controls 
Turf.JS
helper geo-functions
helper plugins


To do:

identify separate geo-helper functions from leaflet and turf plugins.  

geo-helper functions:
I need to refactor eliminating jquery and bootstrap usage and made compatible with React Native and JSX.

leaflet-plugins:
I need to compare the vanilla JS Leaflet plugins to the React components.  If there is a React equivalent component use that otherwise if the original Leaflet plugin is useful it needs to be refactored into React Native/JSX compatible.

https://leafletjs.com/reference-1.7.1.html
https://github.com/Leaflet/Leaflet
https://leafletjs.com/plugins.html
https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md


turf-helper-functions:
Should this be added to my list of dependencies?  Can the source code be accessed and refactored without taking on Turf.js as a dependency?

related resources:
https://github.com/Turfjs/turf/tree/master/examples
https://www.npmjs.com/package/@turf/turf

questions/issues:
is turf.js depracated?

dependencies used:



related resources:
https://github.com/Turfjs/turf/tree/master/examples
https://www.npmjs.com/package/@turf/turf


