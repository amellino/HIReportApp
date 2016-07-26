var React = require('react');
var ReactDOM = require('react-dom');

var formtest = {   
    id: "form-test",
    name: "form-test-name",
    action: "submit-form",
    method: "POST",
    attrs:{
	rel: "form-rel"
    },
    submit:{
	id: "submit-test-id",
	name: "submit-test",
	value: "Submit Form"
    },
    fields: [
	{   element: "input",
	    type: "text",
	    id: "text-test-id",
	    name: "text-test",
	    value: "Test Text",
	    label: {
		name: "Test Text Input"
	    },
	    attrs: {
		rel: "text-rel"
	    }
	},{ element: "input",
	    type: "checkbox",
	    id: "checboxk-test-id",
	    name: "checboxk-test",
	    value: "no",
	    label: {
		name: "Test Checkbox"
	    },
	    attrs: {
		rel: "checkbox-rel",
		checked: "true"
	    }
	},{ element: "input",
	    type: "radio",
	    id: "radio-test-id",
	    name: "radio-test",
	    value: "",
	    label: {
		name: "Test Radio"
	    },
	    attrs: {
		rel: "radio-rel"
	    }
	},{ element: "input",
	    type: "password",
	    id: "password-test-id",
	    name: "password-test",
	    value: "",
	    label: {
		name: "Test Password"
	    },
	    attrs: {
		rel: "password-rel"
	    }
	},{ element: "textarea",
	    id: "textarea-test-id",
	    name: "textarea-test",
	    value: "This is some text",
	    rows: 5,
	    cols: 40,
	    label: {
		name: "Test Textarea"
	    },
	    attrs: {
		rel: "textarea-rel"
	    }
	},{ element: "select",
	    id: "select-test-id",
	    name: "select-test",
	    label: {
		name: "Test Select"
	    },
	    options: {
		Item_01: "Item 1",
		Item_02: "Item 2",
		Item_03: "Item 3",
		Item_04: "Item 4"
	    }
	}
    ]
};

var Field = React.createClass({
    render: function(){
	if(this.props.field.element=='select'){
	    return(<FormSelect field={this.props.field}/>);
	} else if (this.props.field.element=='input') {
	    return(<FormInput field={this.props.field}/>);
	} else if (this.props.field.element=='textarea') {
	    return(<TextArea field={this.props.field}/>);
	} else {
	    //unknown element
	}
    }
});

var FormSelectOption = React.createClass({
    render: function(){
	return(<option value={this.props.optValue}>{this.props.text}</option>);
    }
});

var FormSelect = React.createClass({
    render: function(){
	var options = this.props.field.options;
	return(
	    <div>
		<FormLabel label={this.props.field.label}/>
		<select	type={this.props.field.type} 
			id={this.props.field.id} 
			name={this.props.field.name}>
			
			{Object.keys(this.props.field.options).map(function (key) {
			    var optValue = options[key];
			    return (
				<FormSelectOption text={key} optValue={optValue}/>
			    );
			})}
			
		</select>
	    </div>
	);
    }
});

var FormInput = React.createClass({
    render: function(){
	var attrs = this.props.field.attrs;
	return(
	    <div>
		<FormLabel label={this.props.field.label}/>
		<input	type={this.props.field.type} 
			id={this.props.field.id} 
			name={this.props.field.name} 
			value={this.props.field.value}
			{...this.props.field.attrs}
			/>
	    </div>
	);
    }
});

var TextArea = React.createClass({
    render: function(){
	return(
	    <div>
		<FormLabel label={this.props.field.label}/>
		<textarea   id={this.props.field.id} 
			    name={this.props.field.name} 
			    value={this.props.field.value}
			    rows={this.props.field.rows} 
			    cols={this.props.field.cols}
		/>
	    </div>
	);
    }
});

var FormLabel = React.createClass({
    render: function(){
	return(<label>{this.props.label.name}</label>);
    }
});

var Forms = React.createClass({
    render: function() {
	return (
	    <form id={formtest.id} name={formtest.name} action={formtest.action} method={formtest.method}>
		{formtest.fields.map(function(field, i) {
		    var field = formtest.fields[i];
		    return (
		      <Field field={field}/>
		    );
		})}
	    </form>
	);
    }
});


ReactDOM.render(<Forms/>, document.getElementById('forms'));

