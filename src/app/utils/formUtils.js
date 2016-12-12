var formUtils = {
	templateZone: function(id, title){
		var json = {id: id, title: title, feats: {}};
		return json;
	},
	templateFeature: function(title) {
		var json = {
		    schema: {
				type: "object",
				properties: {}
			}, uiSchema: {},formData: {}
		};
		return json;
	},
	templateArrayProp: function(title) {
		var json = {
			type: "array",
			title: title,
			items: {type: "object", properties :{}}
		};
		return json;
	},
	templateProp: function(type, title, defaultValue, selectValues) {
		var json = {type: type, title: title};
		if (defaultValue !== undefined && defaultValue !== ""){
			json.defaultValue = defaultValue;
		}
		if (selectValues !== undefined && selectValues.length > 0){
			json.enum = selectValues;
		}
		return json;
	},
	templatePropUISchema: function(widgetType){
		var json = {"ui:widget": widgetType};
		return json;
	},
	createProp: function(id, type, title, default, values){
		var json = {};
		json[id] = templateProp(type, title, defaule, values);
		return json;
	},
	createFeature: function(id, title){
		var json = {};
		json[id] = templateFeature(title);
		return json;
	},
	createZone: function(id, zoneId, tile) {
		var json = {};
		json[id] = templateZone(zoneId, title);
		return json;
	},
	addPropToFeature: function(feature, id, uiProp, data){
		feat = feature.keys()[0];
		feat.schema.properties[prop.keys()[0]] = prop[prop.keys()[0]];
		feat.uiSchema[uiProp.keys()[0]] = uiProp[uiProp.keys()[0]];
		feat.formData[data.keys()[0]] = data[data.keys()[0]];
	},
	addFeatureToZone: function(zone, feature){
		zone.keys()[0].feats[feature.keys()[0]] = feature[feature.keys()[0]];
	}
}
