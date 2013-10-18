package com.streamlined.casestudy;

import java.io.IOException;
import java.util.*;
import com.streamlined.util.exceptions.*;
import com.streamlined.util.collections.*;

class TestTeams
{
  public static void main(String args[])
  {
    ITeamMember teamMember1 = null;
    ITeamMember teamMember2 = null;
    ITeamMember teamMember3 = null;
    ITeamMember teamMember4 = null;
    ITeamMember findTeamMember = null;
    ITeam aTeam = null;
    ITeam aTeam2 = null;
    IPerson person2 = null;
    IPerson person3 = null;
    IPerson person4 = null;
    try
    {
        person2 = new Person("Billy Bob Lee");
        person3 = new Person("Peggy Sue");
        person4 = new Person("Vinnie Mac");
        person2.setEmail("billybob@msn.com");
        person3.setEmail("psue@aol.com");
        person4.setEmail("vmac@cnn.com");
        teamMember1 = TeamMember.testNoNominate();
        aTeam = teamMember1.getTeam();
        teamMember2 = new TeamMember(person2, aTeam);
        teamMember3 = new TeamMember(person3, aTeam);
        teamMember2.makeChair();
        teamMember3.makeChair();
        findTeamMember = aTeam.getTeamMember(teamMember1.getPerson());
        System.out.println("\nFound team member:" + findTeamMember);
        List chairs = aTeam.getChairs();
        CollectionPerformer aPerformer = new CollectionPerformer()
        {
            public void performBlock(Object listElement, Object keyValue)
            {
                System.out.println("\n" + ((ITeamMember)listElement).getName());
            }
        };
        aPerformer.perform(chairs);
        aTeam2 = Team.testSingleChairTeam();
        teamMember4 = new TeamMember(person2, aTeam2);
        findTeamMember = person2.getTeamMember(aTeam2);
        System.out.println("\nFound team member:" + findTeamMember);
        
    }
    catch (BusinessRuleException ex)
    {
        System.out.println("BOOM: " + ex.getMessage());
    }

    System.out.println("\nPress ENTER to exit");
        try {
            System.in.read();
        }
     catch (IOException e) { return; }
  }
}
