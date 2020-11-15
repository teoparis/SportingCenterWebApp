package SpringBootPackage;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Activity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  private final String name;
  private final String descr;

  public Activity() {
    this.name = "";
    this.descr = "";
  }

  public Activity(String name, String descr) {
    this.name = name;
    this.descr = descr;
  }


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return descr;
  }

  @Override
  public String toString() {
    return "{ "+ "Id: " +  this.id + " Name: " + this.name + " Email: " + this.descr + " }";
  }
}
