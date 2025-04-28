package com.agence.service;

import com.agence.entity.User;
import com.agence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Optional<User> authenticate(String usernameOrEmail, String password) {
        System.out.println("Tentative de connexion pour : " + usernameOrEmail);
        System.out.println("Utilisateurs en base : " + userRepository.findAll());
        Optional<User> userOpt = userRepository.findByUsername(usernameOrEmail);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(usernameOrEmail);
        }
        if (userOpt.isPresent()) {
            System.out.println("Utilisateur trouvé : " + userOpt.get().getUsername());
            System.out.println("Mot de passe en base : " + userOpt.get().getPassword());
            System.out.println("Mot de passe reçu : " + password);
            boolean match = password.equals(userOpt.get().getPassword());
            System.out.println("Résultat de la comparaison : " + match);
            if (match) {
                return userOpt;
            }
        }
        return Optional.empty();
    }
} 