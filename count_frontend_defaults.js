const fs=require('fs');
const text=fs.readFileSync('src/lib/cms.js','utf8');
const defGallery=(text.match(/const defaultGallery = \[/g)||[]).length;
const defBlogs=(text.match(/const defaultBlogs = \[/g)||[]).length;
const galleryItems=(text.match(/\{\s*id:\s*"\d+"|src:\s*"https?:\/\//g)||[]).length;
console.log('defGallery arrays',defGallery); console.log('potential src items',galleryItems);
