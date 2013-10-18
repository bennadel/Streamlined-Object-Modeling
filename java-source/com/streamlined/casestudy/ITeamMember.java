package com.streamlined.casestudy;

import java.util.*;
import com.streamlined.util.exceptions.*;

public interface ITeamMember extends ITeamMemberProfile
{    
    // ACCESSORS -- add collaborators
    public void addPerson(IPerson aPerson) throws BusinessRuleException;
    public void addTeam(ITeam aTeam) throws BusinessRuleException;
    public void removePerson(IPerson aPerson) throws BusinessRuleException;
    public void removeTeam(ITeam aTeam) throws BusinessRuleException;

    // ACCESSORS -- do adds
    public void doAddPerson(IPerson aPerson);
    public void doAddTeam(ITeam aTeam);
    public void doAddNomination(INomination aNomination);
    public void doRemovePerson(IPerson aPerson);
    public void doRemoveTeam(ITeam aTeam);
    public void doRemoveNomination(INomination aNomination);

    // CONDUCT BUSINESS
    public void makeAdmin() throws BusinessRuleException;
    public void makeChair() throws BusinessRuleException;
    public void makeMember() throws BusinessRuleException;
    public void grantNominatePrivilege() throws BusinessRuleException;
    public void grantDeletePrivilege()throws BusinessRuleException;
    public void revokeNominatePrivilege()throws BusinessRuleException;
    public void revokeDeletePrivilege()throws BusinessRuleException;             
    
    // COLLABORATION RULES
    public void testAddPerson(IPerson aPerson) throws BusinessRuleException;
    public void testAddTeam(ITeam aTeam) throws BusinessRuleException;
    public void testAddNomination(INomination aNomination) throws BusinessRuleException;
    public void testRemovePerson(IPerson aPerson) throws BusinessRuleException;
    public void testRemoveTeam(ITeam aTeam) throws BusinessRuleException;
}