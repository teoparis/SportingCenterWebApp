package SpringBootPackage;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    @Bean
    CommandLineRunner init(UserRepository userRepository, ActivityRepository activityRepository) {
        return args -> {
            Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel").forEach(name -> {
                User user = new User(name, name.toLowerCase() + "@domain.com");
                userRepository.save(user);
            });
            Stream.of("Functional Training", "Crossfit", "Zumba", "Nuoto", "Ballo").forEach(name1 -> {
            Activity attvita = new Activity(name1, name1.toLowerCase() + "@domain.com");
            activityRepository.save(attvita);
            });
            userRepository.findAll().forEach(System.out::println);
            activityRepository.findAll().forEach(System.out::println);

        };
    }
}
