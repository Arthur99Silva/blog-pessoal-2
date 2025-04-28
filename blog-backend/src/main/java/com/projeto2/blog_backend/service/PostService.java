package com.projeto2.blog_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto2.blog_backend.model.Post;
import com.projeto2.blog_backend.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Obtém todas as postagens
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Cria uma nova postagem
    public Post createPost(Post post) {
        post.setData(LocalDateTime.now());
        return postRepository.save(post);
    }

    // Atualiza uma postagem existente
    public Post updatePost(Long id, Post postDetails) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado com o id: " + id));
        post.setTitulo(postDetails.getTitulo());
        post.setConteudo(postDetails.getConteudo());
        post.setAutor(postDetails.getAutor());
        post.setData(LocalDateTime.now());
        return postRepository.save(post);
    }

    // Exclui uma postagem pelo ID
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
