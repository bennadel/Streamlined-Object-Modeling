package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;

class TestDocument
{
  public static void main(String args[])
  {
    Document aDocument = null;
    
    /** Try to create Document test object.
      * If fail print business rule exception message.
      * If pass print Document test object.
      * Tests of accessors and methods can be added to 
      * this script.
      */
    try { aDocument = Document.testSecret();}
    catch (BusinessRuleException ex)
    {
        System.out.println("BOOM: " + ex.getMessage());
    }
    
    System.out.println("\n" + aDocument );
    System.out.println("\nPress ENTER to exit");
    try { System.in.read(); }
     catch (IOException e) { return; }
  } // end main
} // end TestDocument
