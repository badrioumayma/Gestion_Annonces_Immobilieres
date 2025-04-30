package com.agence;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.agence",
    "com.agence.business",
    "com.agence.business.impl",
    "com.agence.dao",
    "com.agence.dao.repositories",
    "com.agence.config",
    "com.agence.web",
    "com.agence.web.controller",
    "com.agence.web.dto"
})
@EnableJpaRepositories(basePackages = {"com.agence.dao.repositories"})
@EntityScan(basePackages = {"com.agence.dao.entities"})
public class BackendAgenceImmobiliereApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendAgenceImmobiliereApplication.class, args);
    }
} 