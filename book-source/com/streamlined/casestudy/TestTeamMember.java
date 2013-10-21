package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;

class TestTeamMember
{
  public static void main(String args[])
  {
    TeamMember aTeamMember = null;
    
    /** Try to create TeamMember test object.
      * If fail print business rule exception message.
      * If pass print TeamMember test object.
      * Tests of accessors and methods can be added to 
      * this script.
      */
    try { aTeamMember = TeamMember.testChair();}
    catch (BusinessRuleException ex)
    {
        System.out.println("BOOM: " + ex.getMessage());
    }
    
    System.out.println("\n" + aTeamMember );
    System.out.println("\nPress ENTER to exit");
    try { System.in.read(); }
     catch (IOException e) { return; }
  } // end main
} // end TestTeamMember
