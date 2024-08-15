/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kq23xy8q8tyo7zs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xetaijbz",
    "name": "Competences",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "gt2a5d9fl0zg0ad",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 2,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kq23xy8q8tyo7zs")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xetaijbz",
    "name": "Competences",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "gt2a5d9fl0zg0ad",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 2,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
