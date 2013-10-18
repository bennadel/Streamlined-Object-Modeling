package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

class TestCaseStudy
{
  public static void main(String args[])
  {
    TeamMember teamMember1 = null;
    TeamMember teamMember2 = null;
    TeamMember teamMember3 = null;
    TeamMember teamMember4 = null;
    Document aDocument = null;
    SecurityLevel sLevel = null;
    INomination aNomination = null;
    try
    {
        teamMember1 = TeamMember.testNoNominate();
        aDocument = Document.testDocument();
        aDocument.nominate(teamMember1);
    }
    catch (BusinessRuleException ex)
    {
        System.out.println("BOOM: " + ex.getMessage());
    }

    try
    {
        int delay = 3;
        System.out.println("wait while build nominations..." + delay + " seconds apart");
        aDocument = Document.testSecret();
        teamMember2 = TeamMember.testSecret();
        aDocument.nominate(teamMember2);
        aNomination = aDocument.getLatestNomination();
        aNomination.setStatusInReview();
        aNomination.setStatusRejected();
        Thread.sleep(delay * 1000);
        teamMember3 = TeamMember.testSecret();
        aDocument.nominate(teamMember3);
        aNomination = aDocument.getLatestNomination();
        aNomination.setStatusInReview();
        aNomination.setStatusRejected();
        Thread.sleep(delay * 1000);
        aDocument.nominate(teamMember2);
        aNomination = aDocument.getLatestNomination();
        aNomination.setStatusInReview();
        aNomination.setStatusApproved();
        CollectionPerformer printList = new CollectionPerformer()
        {
            public void performBlock(Object listElement, Object keyValue)
            {
                System.out.println("\n" + ((INomination)listElement).getNominationDate());
            }
        };
        printList.perform(aDocument.getNominations());
        System.out.println("Noms per days #2 :" + teamMember2.countNominationsPerDays(30));
        System.out.println("Noms per days #1 :" + teamMember1.countNominationsPerDays(30));
    }
    catch (Exception ex)
    {
        System.out.println("\n\nBOOM: " + ex.getMessage());
    }
/*
    try
    {
        aTeamMember = TeamMember.testSecret();
        aDocument.nominate(aTeamMember);
    }
    catch (BusinessRuleException ex)
    {
        System.out.println("\n\nBOOM: " + ex.getMessage());
    }
    System.out.println("\n" + aTeamMember + "\n" +  aDocument);
 */   
    System.out.println("\nPress ENTER to exit");
        try {
            System.in.read();
        }
     catch (IOException e) { return; }
  }
}
