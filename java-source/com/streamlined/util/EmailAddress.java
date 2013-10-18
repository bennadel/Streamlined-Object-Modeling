package com.streamlined.util;

import java.text.StringCharacterIterator;
import java.text.CharacterIterator;
import com.streamlined.util.exceptions.*;

public class EmailAddress extends Object
{
    // DEFINE
    private String address;
    private static String EMPTY_ADDRESS = "EMPTY";

    // INITIALIZE
    public EmailAddress() throws BusinessRuleException
    {
        this(EMPTY_ADDRESS);
    }
    
    public EmailAddress(String newAddress) throws BusinessRuleException
    {
        this.setAddress(newAddress);
    }
 
    // ACCESSING
    public String getAddress()
    {
        return this.address;
    }
        
    public void setAddress(String newAddress) throws BusinessRuleException
    {
        this.testSetAddress(newAddress);
        this.address = newAddress;
    }

    public void setAddressEmpty() throws BusinessRuleException
    {
        this.setAddress(EMPTY_ADDRESS);
    }

    // PRINT
    public String toString()
    {
        return this.address;
    }
    
    // EQUALS
    public boolean equals(Object anObject)
    {
        if (anObject instanceof EmailAddress)
        {
            EmailAddress other = (EmailAddress)anObject;
            return this.address.equals(other.address);
        }
        return false;
    }

    // PROPERTY RULES
    private void testSetAddress(String newAddress) throws BusinessRuleException
    {
        if (newAddress == null)
        {
            throw new BusinessRuleException("Email address is null.");
        }
        
        if (newAddress.equals(EMPTY_ADDRESS)) return;
        
        int dotPos = newAddress.lastIndexOf('.');
        int atPos = newAddress.lastIndexOf('@');
        int lastPos = newAddress.length() - 1;
  
        // if no '@' or '.' then is invalid
        // if '.' is last char then is invalid
        // if last '.' is before '@' or no character between them then is invalid
        if ((atPos < 0 || dotPos < 0)
            || ((lastPos < dotPos + 2) || (dotPos < atPos + 2) ))
        {
           throw new BusinessRuleException("invalid domain name: " + newAddress);
        }
    
        // check pieces for invalid characters
        // from start up to last '@'
        // from after last '@' up to last '.'
        // from after last '.' to end
        this.validatePiece(newAddress, 0, atPos);
        this.validatePiece(newAddress, atPos+1, dotPos);
        this.validatePiece(newAddress, dotPos+1, lastPos +1);
    }
    
    /** Checks if portion of email address is valid.
      * Portions checked fall before last '@' symbol,
      * between '@' and last '.' ,
      * and after last '.' to end of address.
      * Throws error if first character is not letter, digit, or, '_'.
      * Allows '.' and '_' in remainder of string.
      */     
    private void validatePiece(String testString, int startPos, int endPos) 
        throws BusinessRuleException
    {
        StringCharacterIterator strIter = 
            new StringCharacterIterator(testString, startPos, endPos, startPos);
        char c = strIter.first();
        if (!Character.isUnicodeIdentifierPart(c)) 
        {
            throw new BusinessRuleException("invalid address: " + testString);
        }
        boolean goodAddress = true;
        while(c != CharacterIterator.DONE)
        {
            if ((c == '.' || c == '-') || Character.isUnicodeIdentifierPart(c))
            {
                c = strIter.next();
            }
            else 
            {
                c = CharacterIterator.DONE;
                goodAddress = false;
            }
        }
        if (!goodAddress) 
        {
            throw new BusinessRuleException("invalid address part " + testString);
        }
    }
}
        