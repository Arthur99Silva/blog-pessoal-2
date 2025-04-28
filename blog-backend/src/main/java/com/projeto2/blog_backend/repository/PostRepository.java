package com.projeto2.blog_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto2.blog_backend.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Você pode adicionar consultas personalizadas aqui se necessário.
}
