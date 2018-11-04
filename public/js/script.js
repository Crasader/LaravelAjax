$(function(){
   $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
   });

   // ADD
   $('#btn-save-add-post').click(function (e) {
      var title = $('#title').val();
      var author = $('#author').val();
      var description = $('#description').val();

      if (title == "") {
        $("[name=title]").css("border","2px solid #ff1505");

        return false;

      } else {
        $("[name=title]").css("border","2px solid");
      }

      if (author == "") {
        $("[name=author]").css("border","2px solid #ff1505");

        return false;

      } else {
         $("[name=author]").css("border","2px solid");
      }

      if (description == "") {
        $("[name=description]").css("border","2px solid #ff1505");

        return false;

      } else {
         $("[name=description]").css("border","2px solid ");
      }

      e.preventDefault();
      $.ajax({
            type: "POST",
            url: "/posts",
            data: { "title": title, "author": author, "description": description },
            dataType: 'json',
            success: function (data) {
              var post = '<tr id="post' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td>><td>' + data.author + '</td><td>' + data.description + '</td>';
                post += '<td><button class="btn btn-info open-modal" value="' + data.id + '">Edit</button>&nbsp;';
                post += '<button class="btn btn-danger delete-post" value="' + data.id + '">Delete</button></td></tr>';
                $('#posts-list').append(post);
                $('#postsAddModal').modal('hide');
              console.log(data);
                window.location.reload();
            },
            error: function (data) {
                console.log('Error:', data.responseJSON);
            }
       });


    });

    // EDIT
    $('body').on('click', '#modal-edit', function () {
      var post_id = $(this).val();
      console.log(post_id);
      $.get('/posts/edit/' + post_id, function (data) {
          console.log(data);
          $('#post_id').val(data.id);
          var title = $('#title-edit').val(data.title);
          var author = $('#author-edit').val(data.author);
          var description = $('#description-edit').val(data.description);
      });
    });

    // UPDATE
    $('#btn-save-update-post').click(function (e) {

      var title = $('#title-edit').val();
      var author = $('#author-edit').val();
      var description = $('#description-edit').val();
      var post_id = $('#post_id').val();

      if (title == "") {
        $("[name=title]").css("border","2px solid #ff1505");

        return false;

      } else {
        $("[name=title]").css("border","2px solid");
      }

      if (author == "") {
        $("[name=author]").css("border","2px solid #ff1505");

        return false;

      } else {
         $("[name=author]").css("border","2px solid");
      }

      if (description == "") {
        $("[name=description]").css("border","2px solid #ff1505");

        return false;

      } else {
         $("[name=description]").css("border","2px solid ");
      }


      e.preventDefault();
      $.ajax({
            type: "POST",
            url: "/posts/update/" + post_id,
            data: {"title": title, "author": author, "description": description },
            dataType: 'json',
            success: function (data) {
              console.log(data);
              var post = '<tr id="post' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td>><td>' + data.author + '</td><td>' + data.description + '</td>';
                post += '<td><button class="btn btn-info open-modal" value="' + data.id + '">Edit</button>&nbsp;';
                post += '<button class="btn btn-danger delete-post" value="' + data.id + '">Delete</button></td></tr>';
                $("#post_id" + post_id).replaceWith(post);
                $('#postsEditModal').modal('hide');
                window.location.reload();
                console.log(data);
            },
            error: function (data) {
                console.log('Error:', data.responseJSON);
            }
       });
    });

    // DELETE
    $('.delete-post').click(function () {
        var post_id = $(this).val();

        $.ajax({
            type: "DELETE",
            url: 'posts/' + post_id,
            success: function (data) {
                $("#post" + post_id).remove();

                window.location.reload();
            },
            error: function (data) {
                console.log('Error:', data.responseJSON);
            }
        });
    });



});
