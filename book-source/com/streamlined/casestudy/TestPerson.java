package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.EmailAddress;

class TestPerson
{
  public static void main(String args[])
  {
    Person aPerson = null;
    
    /** Try ot create Person test object.
      * If fail print business rule exception message.
      * If pass print person test object.
      * Tests of accessors and methods can be added to 
      * this script.
      */
    try { aPerson = Person.testPerson();}
    catch (BusinessRuleException ex)
    {
        System.out.println("BOOM: " + ex.getMessage());
    }
    
    System.out.println("\n" + aPerson );
    System.out.println("\nPress ENTER to exit");
    try { System.in.read(); }
     catch (IOException e) { return; }
  } // end main
} // end TestPerson
