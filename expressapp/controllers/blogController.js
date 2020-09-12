const { pool } = require('../dbConfig');
//const ensureAuthenticated = require('../auth');

const allBlogs = (req, res)=>{
    
    pool.query(
        `SELECT * FROM blogs`, (err, result)=>{
            if (err){
                throw err;
            }
            res.render('blogs/home', {'posts': result.rows,'title':'base'});
        }
    );
}

const createBlog = (req, res)=>{
    if(req.isAuthenticated()){
        res.render('blogs/post_form', {'title':'Add Blog'});
    }
    res.redirect('/users/login');
    
}

const createBlogPOST = (req, res)=>{
    let {title, description, content} = req.body;

    pool.query(
        `INSERT INTO blogs(title, description, content, author)
        VALUES($1, $2, $3, $4)`, [title, description, content, req.user.id], (err, result)=>{
            if (err){
                throw err;
            }
            res.redirect('/blogs');
        }
    );
}

const getBlog = (req, res)=>{
    pool.query(
        `SELECT * FROM blogs WHERE id=$1`,[req.params.id], (err, result)=>{
            if (err){
                throw err;
            }
            res.render('blogs/post_detail', {'post':result.rows[0],'title':result.rows[0].title});
        }
    );
}

const editBlog = (req, res)=>{
    if(req.isAuthenticated()){
        pool.query(
            `SELECT author FROM blogs
            WHERE id=$1`,[req.params.id], (err, result)=>{
                if (err){
                    throw err;
                }
                console.log('-=-=-= author ',result.rows[0].author,' --- user- ',req.user.id );
                if (result.rows[0].author == req.user.id){
                    res.render('blogs/edit_form', {'title':'Edit'});
                }
                else{
                    req.flash('error','You are not the owner of this post!');
                    res.redirect('/blogs/'+req.params.id);
                }
                
            }
        );
        
    }
    else{
        res.redirect('/users/login');
    }
}

const editBlogPOST = (req, res)=>{
    let {title, description, content} = req.body;
    pool.query(
        `UPDATE blogs
         SET title = $1, description = $2, content = $3
         WHERE id = $4`,
        [title, description, content, req.params.id],(err, result)=>{
            if (err){
                throw err;
            }
            console.log(req.params.id)
            res.redirect('/blogs/'+req.params.id);
        }
    );
}

const deletePage= (req, res)=>{
    const id = req.params.id;
    if(req.isAuthenticated()){
        pool.query(
            `SELECT author FROM blogs WHERE id=$1`,[id],(err, result)=>{
                if (err){
                    throw err;
                }
                if (result.rows[0].author == req.user.id){
                    res.render('blogs/post_confirm_delete', {id:id ,'title':'Delete'})
                }
                else{
                    req.flash('error','You are not the owner of this post!');
                    res.redirect('/blogs/'+id);
                }
            }
        );
    }
    else{
        res.redirect('/users/login');
    }
}


const deleteBlog = (req, res)=>{
    const id = req.params.id;
    pool.query(
        `DELETE FROM blogs WHERE id=$1`,[id], (err, result)=>{
            if (err){
                throw err;
            }
            res.json({redirect: '/blogs'});
        }
    ); 
}

const userBlogs = (req, res)=>{
    const id = req.params.id;
    pool.query(
        `SELECT title, description, content FROM blogs
        WHERE author=$1`,[id], (err, result)=>{
            if(err){
                throw err;
            }
            res.render('blogs/user_post', {'posts': result.rows,'title':req.user.name});
        }
    );
}

module.exports={
    allBlogs, createBlog,
     createBlogPOST, 
     getBlog, 
     editBlog, editBlogPOST, deletePage, deleteBlog, userBlogs
}
