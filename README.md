# express-mongoose

Buatlah sebuah aplikasi express sederhana.

Kamu diminta untuk membuat sebuah model bernama Movie dengan field:
 - Title, bertipe String dengan validasi judul minimal 2 karakter
 - Genre, bertipe enum String (Thriller, Comedy, Action, Romance)
 - actors, bertipe array of String
 - ratings, bertipe number dengan validasi angka minimal 1 dan maksimal 10


Buatlah routing:

| method | route | output/desc |
| -------| ------- | ------------- |
| GET     | /movies | me-return documents yang ada pada collection movies |
| POST    | /movies | me-return objectID document yang berhasil di insert |
| PUT     | /movies/:id | me-return pesan document berhasil diupdate atau tidak |
| REMOVE  | /movies/:id | me-return pesan document berhasil didelete atau tidak |
| GET     | /movies? | me-return document berdasarkan req.query search |  

**NOTES**
-  route '/movies?' merupakan bonus, tidak dikerjakan tidak mengurangi nilai full 100. 
   Contoh url: http://localhost:3000/movies?search='search'&genre='Action'
   output: array of object movies
- Nilai akan dikurangi 20 points jika node_modules ke upload
