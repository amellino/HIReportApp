var formJSON = {
    
    header:{
	schema : {
	    type: "object",
	    properties: {
		address: {type: "string", title: "Address"},
		propetyType: {type: "string", title: "Property Type"},
		subType: {type: "string", title: "Sub Type"}
	    }
	}, 
	uiSchema : {
	    description: {"ui:widget": "textarea"}
	},
	formData : {
	    
	}
    },
    zones: {
	Kitchen: {
	    feats: {
		stove: {
		    schema : {
			type: "object",
			properties: {
			    stove: {
				title: "Stove",
				type: "object",
				required: ["type"],
				properties: {
				    type: {type: "string", title: "Name"},
				    condition: {type: "string", title: "Condition", default: "", 
						enum: ["","Excellent","Good","Acceptable","Poor"]},
				    image: {type: "string", title: "image",default: "Image URL"},
				    description: {type: "string", title: "Description"},
				    other:{
					type: "array", 
					title: "Other",
					items: {
					    type: "object",
					    properties :{
						item: {type: "string", title:"Item"},
						details: {type: "string", title:"Details"}
					    }
					}
				    }
				}
			    }
			}
		    },
		    uiSchema : {
			description: {"ui:widget": "textarea"},
			details: {"ui:widget": "textarea"}
		    },
		    formData : {
			
		    }
		},
		counters: {
		    schema : {
			type: "object",
			properties: {
			    counters: {
				title: "Counter",
				type: "object",
				required: ["type"],
				properties: {
				    type: {type: "string", title: "Name"},
				    condition: {type: "string", title: "Condition", default: "", 
						enum: ["","Excellent","Good","Acceptable","Poor"]},
				    image: {type: "string", title: "image",default: "Image URL"},
				    description: {type: "string", title: "Description"},
				    other:{
					type: "array", 
					title: "Other",
					items: {
					    type: "object",
					    properties :{
						item: {type: "string", title:"Item"},
						details: {type: "string", title:"Details"}
					    }
					}
				    }
				}
			    }
			}
		    },
		    uiSchema : {
			description: {"ui:widget": "textarea"}
		    },
		    formData : {
			
		    }
		}
	    }
	}
	,Garage: {
	    feats: {
		floor: {
		    schema : {
			type: "object",
			properties: {
			    stove: {
				title: "Floor",
				type: "object",
				required: ["type"],
				properties: {
				    type: {type: "string", title: "Name"},
				    condition: {type: "string", title: "Condition", default: "", 
						enum: ["","Excellent","Good","Acceptable","Poor"]},
				    image: {type: "string", title: "image",default: "Image URL"},
				    description: {type: "string", title: "Description"},
				    other:{
					type: "array", 
					title: "Other",
					items: {
					    type: "object",
					    properties :{
						item: {type: "string", title:"Item"},
						details: {type: "string", title:"Details"}
					    }
					}
				    }
				}
			    }
			}
		    },
		    uiSchema : {
			description: {"ui:widget": "textarea"},
			details: {"ui:widget": "textarea"}
		    },
		    formData : {
			
		    }
		},
		roof: {
		    schema : {
			type: "object",
			properties: {
			    counters: {
				title: "Roof",
				type: "object",
				required: ["type"],
				properties: {
				    type: {type: "string", title: "Name"},
				    condition: {type: "string", title: "Condition", default: "", 
						enum: ["","Excellent","Good","Acceptable","Poor"]},
				    image: {type: "string", title: "image",default: "Image URL"},
				    description: {type: "string", title: "Description"},
				    other:{
					type: "array", 
					title: "Other",
					items: {
					    type: "object",
					    properties :{
						item: {type: "string", title:"Item"},
						details: {type: "string", title:"Details"}
					    }
					}
				    }
				}
			    }
			}
		    },
		    uiSchema : {
			description: {"ui:widget": "textarea"}
		    },
		    formData : {
			
		    }
		}
	    }
	}
    }
};

/*
 * this.props.children should either be a ReactElement or an array of ReactElement, but not components.

To get the DOM nodes of the children elements, you need to clone them and assign them a new ref.

render() {
  return (
    <div>
      {React.Children.map(this.props.children, (element, idx) => {
        return React.cloneElement(element, { ref: idx });
      })}
    </div>
  );
}
You can then access the child components via this.refs[childIdx], and retrieve their DOM nodes via ReactDOM.findDOMNode(this.refs[childIdx]).
 */