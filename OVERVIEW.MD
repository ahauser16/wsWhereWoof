## ***Project WhereWoof Resources***

    This is a list of project files (e.g. UDEMY tutorials, wyzant sessions, past bootcamp projects, etc.) that are useful resources for this project. A major challenge is that some code uses plugins and libraries that won't work with this project and so such code will need to be refactored in order to work in a React Native environment which is necessary so that the project code can be transpiled to work on both iOS and Android devices.  There may also be better code examples out there but I have not found them yet but this list will be updated with more content as time goes on.

---

### **I. Lecturer: Michael Miller**

#### source: UDEMY

#### Course Title: "Display and analyze GIS data on the web with Leaflet"

#### Topics Discussed: JavaScript, jquery plugins, turf.js library methods, Leaflet methods, leaflet-draw plugin

#### Noteworthy Source Files: lectures 50, 55 and 62.

#### Summary: 
    Miller specializes in geoJSON data mapping. This lecture series covers many methods, plugins and background information used to map and manipulate data. His use of methods from TurfJS and Leaflet libraries to plot markers, display data in a sidebar and the feature where he can determine if an oil pipeline (a polyline) intersects owl nests (markers with metadata) is especially useful.

#### TODO:

- [ ] Refactor Miller's JS to be React Native compatible.
- [ ] Cross-reference Miller's plugins and dependencies with current React Components to see if they are worth refactoring.
- [ ] List key source code with analysis.
- [ ] read through source code from Leaflet.draw.js in the plugins folder for instructions.

#### Links:

1. [Turf.js homepage docs](http://turfjs.org/)
2. [Turf.js npm docs](http://turfjs.org/)
3. [Turf.js Github](https://github.com/Turfjs/turf)
4. [Leaflet homepage docs](https://leafletjs.com/reference-1.7.1.html)
5. [Leaflet npm docs](https://www.npmjs.com/package/leaflet)
6. [Leaflet Github](https://github.com/Leaflet/Leaflet)
7. [Leaflet plugins](https://leafletjs.com/plugins.html)
8. [React Leaflet components Github](https://github.com/PaulLeCam/react-leaflet)
9. [React Leaflet homepage](https://react-leaflet.js.org/)
10. [azavea blog 'getting started guide'](https://www.azavea.com/blog/2016/12/05/getting-started-with-react-and-leaflet/)

---

### **II. Source: React Native Leaflet**

#### Notes/Issues:
    Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering.  ***This is a major problem*** since I was planning to implement a database and web socket server. Does this mean React and Leaflet are not compatible with my project?  I will need more examples of React and Leaflet working together within complex projects that have server side rendering.

#### Core concepts

    React Leaflet provides bindings between React and Leaflet. It does not replace Leaflet, but leverages it to abstract Leaflet layers as React components. As such, it can behave differently from how other React components work, notably:

#### DOM rendering

    React **does not** render Leaflet layers to the DOM, this rendering is done by Leaflet itself. React only renders a `<div>` element when rendering the [MapContainer component](https://react-leaflet.js.org/docs/api-map/#mapcontainer), the contents of [UI layers components](https://react-leaflet.js.org/docs/api-components/#ui-layers).

#### Component properties

    The properties passed to the components are used to create the relevant Leaflet instance when the component is rendered the first time and should be treated as **immutable by default**.

    During the first render, all these properties should be supported as they are by Leaflet, ***however they will not be updated in the UI when they change*** unless they are explicitely documented as being **mutable**.

    Mutable properties changes are compared by reference (unless stated otherwise) and are applied calling the relevant method on the Leaflet element instance.

#### React context

    React Leaflet uses [React's context API](https://reactjs.org/docs/context.html) to make some Leaflet elements instances available to children elements that need it.  Each Leaflet map instance has its own React context, created by the [MapContainer component](https://react-leaflet.js.org/docs/api-map/#mapcontainer). Other components and hooks provided by React Leaflet can only be used as descendants of a `MapContainer`.

#### Lifecycle process

    1. The `MapContainer` renders a container `<div>` element for the map. If the `placeholder` prop is set, it will be rendered inside the container `<div>`.  
    2. The `MapContainer` instantiates a Leaflet Map for the created `<div>` with the component properties and creates the React context containing the map instance.  
    3. The MapContainer renders its children components.  
    4. Each child component instantiates the matching Leaflet instance for the element using the component properties and context, and adds it to the map.  
    5. When a child component is rendered again, changes to its supported mutable props are applied to the map.
    6. When a component is removed from the render tree, it removes its layer from the map as needed.

#### Limitations

    Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering.  The components exposed are abstractions for Leaflet layers, not DOM elements. Some of them have properties that can be updated directly by calling the setters exposed by Leaflet while others should be completely replaced, by setting an unique value on their key property so they are properly handled by React's algorithm.

#### TODO:

- [ ] Refactor Miller's JS to be React Native compatible.

#### Links:

1. [React Leaflet homepage docs](https://react-leaflet.js.org/docs/start-introduction#component-properties)
2.

---

## TODO No. 2 - itemize dependencies, justify their use for the project and whether they are temporary resources for development purposes.

## TODO No. 3 -
