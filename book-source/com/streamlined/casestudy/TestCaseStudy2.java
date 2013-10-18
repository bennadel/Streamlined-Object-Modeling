package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;

class TestCaseStudy2
{
  public static void main(String args[])
  {
    ITeamMember aTeamMember = null;
    IDocument aDocument = null;
    SecurityLevel sLevel = null;
    INomination aNomination = null;
    try
    {
        aTeamMember = TeamMember.testAdmin();
        Nomination.testOldNomination(aTeamMember);
        Nomination.testOldNomination(aTeamMember);
        Nomination.testOldNomination(aTeamMember);
        Nomination.testOldNomination(aTeamMember);
        aNomination = Nomination.testOldNomination(aTeamMember);
  
        // doesn't blow when add this because is more than 30 days after othersw.
        aDocument = Document.testDocument();
        aDocument.nominate(aTeamMember);
    
        aDocument = Document.testDocument();
        aDocument.nominate(aTeamMember);
    
        aDocument = Document.testDocument();
        aDocument.nominate(aTeamMember);
        aNomination = aDocument.getLatestNomination();
        aNomination.setStatusInReview();
        aNomination.setStatusApproved();
        aDocument.publish();
        System.out.println("published: " + aDocument);
        
        aTeamMember.removeTeam(Team.testSingleChairTeam());
    
        aDocument = Document.testDocument();
        aDocument.nominate(aTeamMember);
    
        aDocument = Document.testDocument();
        aDocument.nominate(aTeamMember);
    }
    catch (BusinessRuleException ex)
    {
        System.out.println("\nBOOM: " + ex.getMessage());
    }
   
    System.out.println("Nomination: " + aNomination);
//    System.out.println("\n" + aTeamMember + "\n\n" +  aDocument);

    try
    {
        aDocument = Document.testDocument();
        aDocument.nominate(aTeamMember);
    }
    catch (BusinessRuleException ex)
    {
        System.out.println("\nBOOM: " + ex.getMessage());
    }
    System.out.println("\nPress ENTER to exit");
        try {
            System.in.read();
        }
     catch (IOException e) { return; }
  }
}
