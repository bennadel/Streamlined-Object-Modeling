package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;

class TestTeam
{
  public static void main(String args[])
  {
    Team aTeam = null;
    
    /** Try to create Team test object.
      * If fail print business rule exception message.
      * If pass print Team test object.
      * Tests of accessors and methods can be added to 
      * this script.
      */
    try { aTeam = Team.testSingleChairTeam();}
    catch (BusinessRuleException ex)
    {
        System.out.println("BOOM: " + ex.getMessage());
    }
    
    System.out.println("\n" + aTeam );
    System.out.println("\nPress ENTER to exit");
    try { System.in.read(); }
     catch (IOException e) { return; }
  } // end main
} // end TestTeam
